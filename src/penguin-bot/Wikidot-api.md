The main concept of naming is as follows:

namespace is type of object you work with
select methods return array of names
get methods return array of all data of matched objects
get_one methods return array of all data of one matched object
The list will grow as the methods are added. The methods are discussed here.

XML-RPC api is limited to 240 req/min (per user).

categories.select
Select all categories from given site

argument keys:
site: site to get pages from, e.g. "my-site"
returns: list of category names
>>> s.categories.select({"site": "my-site"})
["_default", "admin", "forum", "system", "blog"]
files.select
Get names of files attached to page

argument keys:
site: what site we ask about
page: what page (full name) we ask about
returns: list of file names
files.get_meta
Get meta data of given files

argument keys:
site: what site we ask about
page: what page (full name) we ask about
files: name of files to get meta data of — max 10 of them
returns: dictionary of files. File name is key of each item in it. The value is a dictionary of:
size — size in bytes
comment
mime_type
mime_description
uploaded_by
uploaded_at
download_url — URL to download the file from. For private sites, the URL contains authorization token ?ukey=... valid for about 5 minutes.
files.get_one
This method works for small files only (max 6MB).

Get file attached to page (alternatively you can use download_url from get_meta method above)

argument keys:
site: site to get page from
page: page to get file from
file: name of file to get
returns: dictionary with the same keys as files.get_meta and additionally:
content — base64-encoded file contents
files.save_one
With this method you can attach files not bigger than 50MB. Other file size limits also apply:

site storage — can't upload file bigger than current unused file storage for site
maximum file size depending on free/Pro Wikidot plan
Attaches file to page

argument keys:
site: site of page to attach file to
page: page to attach file to
file: name of file to attach
comment (optional): file description
save_mode (optional): allowed mode of operation
create — only allow creating new objects (exception thrown if object with this name already exists)
update — only allow updating objects (exception thrown if no object with this name exists)
create_or_update (default) — allow both creating and updating object
content: base64-encoded file content
notify_watchers (optional):
true: notify watchers about the edit (as if it was done with the web interface)
false (default): don't notify watchers
revision_comment (optional): revision comment (displayed in history)
returns: the newly uploaded file information as dictionary the same to what files.get_meta return for each file
tags.select
Select all tags from pages from given site or page or category

argument keys:
site: site to get pages to get tags from, e.g. "my-site"
categories (optional): list of names of categories to get pages to get tags from
pages (optional): list of full names of pages to get tags from — max 10 of them
returns: list of tags
pages.select
Select pages that match given criteria

argument keys (if not stated otherwise, possible values documented in ListPages module):
site: site to get pages from, e.g. "my-site"
pagetype (optional): default "*"
categories (optional): list of category names to pull pages from, default: all categories
tags_any (optional): list of tags, page must have at least one of them
tags_all (optional): list of tags, page must have all of them
tags_none (optional): list of tags, page must have none of them
parent (optional): single page name or "-" for pages with no parent
created_by (optional): single user name
rating (optional)
order (optional)
returns: list of page full names
>>> s.pages.select({"site": "my-site", "categories": ["blog", "news"], "tags_none": ["_draft"], "order": "created_at desc"})
["blog:last-post", "blog:second-post", "blog:first-post", "blog:_template"]
pages.get_meta
Get a bunch of pages and returns (some of) their meta data

argument keys:
site: site to list pages from, eg. "my-site"
pages: list of page full names to list (maximum 10 pages)
returns dictionary of pages. For each page there will be item in the dictionary with page name as key and dictionary of the following page properties as value:
fullname
created_at
created_by
updated_at
updated_by
title
parent_fullname
tags — list of all tags (including those starting with underscore)
rating
revisions
[PLANNED] comments — number of comments
[PLANNED] files — number of files attached to the page
[PLANNED] children — number of children pages
>>> s.pages.meta({"site": "my-site", "pages": ["blog:last-post", "blog:second-post"]})
{
 "blog:last-post": {"fullname": "blog:last-post", "created_at": "2010-08-04T23:20:50Z", "created_by": "Gabrys", "updated_at": "2010-08-04T23:23:31Z", "updated_by": "Gabrys", "title": "Last Post", "parent_fullname": None, "tags": ["blog", "last"], "rating": 8, "revisions": 2},
 "blog:second-post": {"fullname": "blog:second-post", "created_at": "2010-08-03T22:52:10Z", "created_by": "Gabrys", "updated_at": "2010-08-03T22:52:10Z", "updated_by": "Gabrys", "title": "Second Post", "parent_fullname": None, "tags": ["blog", "second"], "rating": 1, "revisions": 1}
}
pages.get_one
Gets one page and returns all its properties

argument keys:
site: site to get a page from, e.g. "my-site"
page: page full name to get, e.g. "start" or "blog:first-post"
returns: page properties as dictionary (consult documentation of ListPages module)
all those listed in pages.get_meta plus:
parent_title
children
content — page content, if page is assigned a form it's in YAML format
html — generated HTML of the page (as seen from browser excluding navigational bars etc)
comments — number of comments
commented_at
commented_by
>>> s.pages.get_one({"site": "my-site", "page": "blog:last-post"})
{"created_at": "2010-08-04T23:20:50Z", "created_by": "Gabrys", "updated_at": "2010-08-04T23:23:31Z", "updated_by": "Gabrys", "title": "Last Post", "parent_fullname": None, "tags": ["blog", "last"], "rating": 8, "revisions": 2, "parent_title": None, "children": 0, "content": "Test blog post", "html": "<p>Test blog post</p>", "comments": 0, "commented_at": None, "commented_by": None}
pages.save_one
Save page. Site and page keys of argument array are required. Set specific keys to update the properties, omit to keep current values.

argument keys:
site: site to save page to
page: page full name to save
title (optional): title to set
content (optional): page content — wiki source
tags (optional): array of tags to set
parent_fullname (optional): parent page full name, "-" to reset
save_mode (optional): allowed mode of operation
create — only allow creating new objects (exception thrown if object with this name already exists)
update — only allow updating objects (exception thrown if no object with this name exists)
create_or_update (default) — allow both creating and updating object
rename_as (optional): rename the page (in addition to possible other changes in source etc)
revision_comment (optional): revision comment (displayed in history)
notify_watchers (optional):
true: notify watchers about the edit (as if it was done with the web interface)
false (default): don't notify watchers
returns: saved page (as in pages.get_one)
We only want to make API for comments currently, but it will be expanded to both comments and forum. That's why the namespace is posts and not comments.

Note the API for posts namespace is not yet stable. This means it may change in the future without notice and break compatibility.

posts.select
Select post/comments on given site, page, thread and/or in reply to other comment.

argument keys:
site: site to get pages to get comments from, e.g. "my-site"
page (optional): page to get comments from
thread (optional): thread to get posts from — not yet implemented
reply_to (optional): only select comments/posts that are direct replies to this one ("-" means not replies to other posts/comments)
created_by (optional): select posts by this user
returns: list of post/comments IDs sorted by date posted
posts.get
argument keys:
site: site to get comments from, e.g. "my-site"
posts: list of IDs of posts/comments to get (max 10 of them)
returns dictionary of posts/comments. For each post/comment there will be item in the dictionary with post/comment ID as key and and dictionary of the following post properties as value:
id — ID of post/comment
fullname — fullname of page to which comment belongs
reply_to — ID of comment which this post/comment replies to
title — title of the post/comment
content — post/comment body (wiki syntax)
html — post/comment body as HTML
created_by — user that posted post/comment
created_at — time post/comment was posted
replies — number of replies to given post/comment — not yet implemented
users.get_me
argument keys:
no arguments needed, pass an empty dictionary or array
returns dictionary of user (the one that API key belongs to) properties:
name: URL version of user name, for example "john-smith" for "John Smith"
title: full name of user, for example "John Smith"
id: ID number of user, for example "12345"
Deleted methods
The following methods are deleted and don't work anymore:

site.pages
site.categories
page.get
page.files
page.save
user.sites