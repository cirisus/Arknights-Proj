import os
import re
import requests
from bs4 import BeautifulSoup
from bs4.element import Tag
import Login


class Config:
    url = 'https://arknights.wikidot.com'
    login_url = 'https://www.wikidot.com/default--flow/login__LoginPopupScreen'
    ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0'
    re_matcher = r'[1-9][0-9]；(同人作品搬运/原创|进行相关的艺术创作|参与网站文章内容评价讨论|其他)；一句暗号；(BILIBILI弹幕视频网|LOFTER|QQ/微信|贴吧|现实聊天|其他)'

    def __init__(self):
        self.wikidot_token7, self.wikidot_session_id = Login.login()

    def request_module(self, module_name, data):
        if data is None:
            data = {}
        if module_name is None:
            module_name = 'Empty'
        data['moduleName'] = module_name
        data['callbackIndex'] = 0
        data['wikidot_token7'] = self.wikidot_token7
        #data['login'] = os.getenv('WIKIDOT_PENGUIN_BOT')
        #data['password'] = os.getenv('WIKIDOT_PENGUIN_TOKEN')
        return requests.post(self.url + '/ajax-module-connector.php',
                             data=data,
                             headers={
                                 'X-Requested-With': 'XMLHttpRequest',
                                 'User-Agent': self.ua,
                                 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                                 'Origin': self.url,
                                 'Referer': self.url + '/_admin/start/ma'
                             },
                             cookies={
                                 'wikidot_token7': self.wikidot_token7,
                                 'WIKIDOT_SESSION_ID': self.wikidot_session_id,
                                 'wikidot_udsession': '1',
                             })


class WikidotApplication(dict):
    def __init__(self, config, /, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.config = config

    def handle(self, accept_type, msg=''):
        if accept_type not in ('accept', 'decline'):
            raise ValueError('accept_type must be accept or decline')
        r = self.config.request_module(None, {
            'action': 'ManageSiteMembershipAction',
            'event': 'acceptApplication',
            'user_id': self.get('user_id'),
            'text': msg,
            'type': accept_type,
        })

    def accept(self, msg=''):
        return self.handle('accept', msg)

    def decline(self, msg=''):
        return self.handle('decline', msg)


class WikidotApplicationsList:
    def __init__(self):
        self.config = Config()
        self.json = None
        self.soup = None
        self.applications = None

    def get_json(self):
        r = self.config.request_module('managesite/ManageSiteMembersApplicationsModule', None)
        self.json = r.json()
        return self.json

    def get_html(self):
        if self.json is None:
            self.get_json()
        self.soup = BeautifulSoup(self.json['body'], 'lxml')
        print(self.soup.prettify())
        return self.soup

    def get_applications(self):
        def list_chunk(temp_list, n):
            for i in range(0, len(temp_list), n):
                yield temp_list[i:i + n]

        if self.soup is None:
            self.get_html()
        applications_html_list = []
        for item in self.soup.body.contents:
            if isinstance(item, Tag):
                if item.name == 'h3' or item.name == 'table':
                    applications_html_list.append(item)
        if len(applications_html_list) % 2 != 0:
            raise ValueError('applications_html_list can not divisible by 2')
        applications_list = []
        for h3, table in list_chunk(applications_html_list, 2):
            if h3.name != 'h3' or table.name != 'table':
                raise ValueError('applications_html_list error')
            applications_list.append(WikidotApplication(self.config, {
                'user_id': str(h3.contents[-1].contents[0].attrs['onclick'])
                                                        .lstrip('WIKIDOT.page.listeners.userInfo(')
                                                        .rstrip('); return false;'),
                'user_name': str(h3.contents[-1].contents[-1].string),
                'user_url': str(h3.contents[-1].contents[-1].attrs['href']),
                'text': str(table.contents[1].contents[3].string).strip()
            }))
        self.applications = applications_list
        return self.applications


def main():
    print('Welcome!\n\n')
    wikidot = WikidotApplicationsList()
    for index, user in enumerate(wikidot.get_applications()):
        for key, data in user.items():
            print(f'[{index}]', key, ': ', data)
        print()
    command = input().split(' ')
    if len(command) != 2:
        print('Error Input!')
        return
    if int(command[0]) >= len(wikidot.applications):
        print('Too large index.')
        return
    if command[1] == '0':
        wikidot.applications[int(command[0])].decline()
    elif command[1] == '1':
        wikidot.applications[int(command[0])].accept()
    else:
        print('Error Input!')
        return


def auto_run():
    print('Running!')
    wikidot = WikidotApplicationsList()
    for user in wikidot.get_applications():
        for key, data in user.items():
            print(key, ': ', data)
        if re.fullmatch(wikidot.config.re_matcher, user['text']):
            user.accept()
            print('**Accept**')
        else:
            user.decline()
            print('**Decline**')
        print()
    print('Done!')

if __name__ == '__main__':
    auto_run()