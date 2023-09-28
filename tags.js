[[>]]
[[a class="tags-button" href="/fragment:tag-search"]][[span class="fa fa-tags"]]@<&nbsp;>@[[/span]] 标签录入[[/a]]
[[/>]]

[!--
工作原理：这个检索系统采用的是wikidot的ListPages功能来创建页面列表。ListPages模块可以根据不同的条件筛选页面，不仅可以设定为通常的数值和字符串，也可以通过“@URL|默认值”这种形式、在此页URL的末尾添加“/检索选项/任意参数”，以指定的参数创建列表。此外，可以同时设置多个URL参数，因此可以自由地设置各种选项。检索系统本身则使用了Javascript来生成检索选项的URL。
--]

+ 分部设置

[!--
[[code type="javascript"]]
var SearchSettingParam = new Object();

SearchSettingParam.BranchData = new Object();
SearchSettingParam.RecentlyTagData = new Object();
SearchSettingParam.getBranchByTag;

//-----------------设置--------------------


//设置各分部的网站URL以及国旗等

SearchSettingParam.BranchData.en = {
     flag:"http://scp-wiki-cn.wdfiles.com//local--files/main/us.png",
     url:"http://scp-wiki.wikidot.com/",
     Tag:"",
     createSource:true
    };

SearchSettingParam.BranchData.ru = {
     flag:"http://scp-wiki-cn.wdfiles.com/local--files/main/ru.png",
     url:"http://scpfoundation.ru/",
     Tag:"ru",
     createSource:true
    };

SearchSettingParam.BranchData.ko = {
     flag:"http://scp-wiki-cn.wdfiles.com/local--files/main/kr.png",
     url:"http://ko.scp-wiki.net/",
     Tag:"ko",
     createSource:true
    };

SearchSettingParam.BranchData.cn = {
     flag:"http://scp-wiki-cn.wdfiles.com/local--files/main/cn.png",
     url:"http://scp-wiki-cn.wikidot.com/",
     Tag:"原创",
     createSource:true
    };

SearchSettingParam.BranchData.fr = {
     flag:"http://scp-wiki-cn.wdfiles.com/local--files/main/fr.png",
     url:"http://fondationscp.wikidot.com/",
     Tag:"fr",
     createSource:true
    };

SearchSettingParam.BranchData.pl = {
     flag:"http://scp-wiki-cn.wdfiles.com/local--files/main/pl.png",
     url:"http://scp-pl.wikidot.com/",
     Tag:"pl",
     createSource:true
    };

SearchSettingParam.BranchData.es = {
     flag:"http://scp-wiki-cn.wdfiles.com/local--files/main/es.png",
     url:"http://lafundacionscp.wikidot.com/",
     Tag:"es",
     createSource:true
    };

SearchSettingParam.BranchData.th = {
     flag:"http://scp-wiki-cn.wdfiles.com/local--files/main/th.png",
     url:"http://scp-th.wikidot.com/",
     Tag:"th",
     createSource:true
    };

SearchSettingParam.BranchData.jp = {
     flag:"http://scp-wiki-cn.wdfiles.com/local--files/main/jp.png",
     url:"http://ja.scp-wiki.net/",
     Tag:"jp",
     createSource:true
    };

SearchSettingParam.BranchData.de = {
     flag:"http://scp-wiki-cn.wdfiles.com/local--files/main/de.png",
     url:"http://scp-wiki-de.wikidot.com/",
     Tag:"de",
     createSource:true
    };

SearchSettingParam.BranchData.it = {
     flag:"http://scp-wiki-cn.wdfiles.com/local--files/main/it.png",
     url:"http://fondazionescp.wikidot.com/",
     Tag:"it",
     createSource:true
    };

SearchSettingParam.BranchData.ua = {
     flag:"http://scp-wiki-cn.wdfiles.com/local--files/main/ua.png",
     url:"http://scp-ukrainian.wikidot.com/",
     Tag:"ua",
     createSource:true
    };

SearchSettingParam.BranchData.pt = {
     flag:"http://scp-wiki-cn.wdfiles.com/local--files/main/pt.png",
     url:"http://scp-pt-br.wikidot.com/",
     Tag:"pt",
     createSource:true
    };

SearchSettingParam.BranchData.wanderers = {
     flag:"http://scp-wiki-cn.wdfiles.com/local--files/main/SerpHand.png",
     url:"http://wanderers-library.wikidot.com/",
     Tag:"wanderers",
     createSource:true
    };

SearchSettingParam.BranchData.undefinedDefault = {
     flag:"",
     url:"",
     createSource:false
    };

//-----------------实际处理------------------------------


//复位

SearchSettingParam.RecentlyTagData.reset = function(){
    SearchSettingParam.RecentlyTagData.Branch = "en";
    SearchSettingParam.RecentlyTagData.Tag = "";
}

SearchSettingParam.RecentlyTagData.reset();


//根据标签识别分部

SearchSettingParam.getBranchByTag = function(tags){
    SearchSettingParam.RecentlyTagData.reset();
    var targetTag = tags.split(" ");
    var Duplication = 0;
    var branch = "en";
    for(var i = 0;i < targetTag.length;i++){
     for(var j in SearchSettingParam.BranchData){
     if(j=="en" || j=="undefinedDefault"){
     continue;
     }
     if(targetTag[i] == SearchSettingParam.BranchData[j].Tag){
     if(branch != j && j != "wanderers"){
     Duplication++;
     }
     if(branch != "wanderers"){
     branch = j;
     }
     SearchSettingParam.RecentlyTagData.Branch = j;
     SearchSettingParam.RecentlyTagData.Tag = SearchSettingParam.BranchData[j].Tag;
     }
     }
    }
    if(Duplication > 1){
     branch = "undefinedDefault";
     SearchSettingParam.RecentlyTagData.reset();
    }
    delete targetTag;
    return branch;
}

//清理缓存
window.addEventListener("beforeunload", function(){
    delete SearchSettingParam;
});

[[/code]]
--]

+ 系统

[[module css]]
th p {
    display: inline !important;
}
.list-pages-item p {
    display: inline !important;
}
.list-pages-item span {
    display: inline-block !important;
}
.wiki-content-table {
    display: none;
}
#page-content .wiki-content-table th span, #page-content .wiki-content-table td span {
    border-style: none !important;
    text-align: left !important;
    background-color: transparent !important;
    padding: 0 !important;
    font-weight: normal !important;
}
.objectColor {
    display: none;
}
.pageNum span:nth-of-type(1) {
    display: inline !important;
}
.datahtml .list-pages-item {
    display: none !important;
}
.tags-button{
    border: 1px solid;
    border-color: #ddd #bbb #bbb #ddd;
    border-bottom-width: 2px;
    border-radius: 4px;
    background-color: #f9f9f9;
    margin: 0 2px;
    padding: 1px 3px;
    white-space: nowrap;
}
#toc0, #toc1{
    display:none;
}
[[/module]]
[[module ListPages range="." limit="@URL|0" urlAttrPrefix="list1"]]
[[%%content{0}%%module css]]
.object .explained {
    font-size: 100% !important;
    color: #77FFFF !important;
}
.object .unclassed {
    font-size: 100% !important;
    color: #777777 !important;
}
.object .safe {
    font-size: 100% !important;
    color: #00FF00 !important;
}
.object .euclid {
    font-size: 100% !important;
    color: #FFDD00 !important;
}
.object .keter {
    font-size: 100% !important;
    color: #FF0000 !important;
}
.object .thaumiel {
    font-size: 100% !important;
    color: #000000 !important;
}
.object .neutralized {
    font-size: 100% !important;
    color: #9900FF !important;
}
.objectColor {
    display: inline-block !important;
}
[[%%content{0}%%/module]]
[[/module]]

[[module ListPages range="." limit="@URL|0" urlAttrPrefix="list2"]]
[[%%content{0}%%module css]]
.wiki-content-table th:nth-of-type(2) {
    display: none;
}
.wiki-content-table td:nth-of-type(2) {
    display: none;
}
[[%%content{0}%%/module]]
[[/module]]
[[module ListPages range="." limit="@URL|0" urlAttrPrefix="list3"]]
[[%%content{0}%%module css]]
.wiki-content-table th:nth-of-type(3) {
    display: none !important;
}
.wiki-content-table td:nth-of-type(3) {
    display: none !important;
}
[[%%content{0}%%/module]]
[[/module]]
[[module ListPages range="." offset="@URL|0" urlAttrPrefix="list4"]]
[[%%content{0}%%module css]]
.wiki-content-table th:nth-of-type(4) {
    display: none !important;
}
.wiki-content-table td:nth-of-type(4) {
    display: none !important;
}
[[%%content{0}%%/module]]
[[/module]]

[[module ListPages range="." offset="@URL|0" urlAttrPrefix="list5"]]
[[%%content{0}%%module css]]
.wiki-content-table th:nth-of-type(5) {
    display: none !important;
}
.wiki-content-table td:nth-of-type(5) {
    display: none !important;
}
[[%%content{0}%%/module]]
[[/module]]
[[module ListPages range="." offset="@URL|0" urlAttrPrefix="list6"]]
[[%%content{0}%%module css]]
.wiki-content-table th:nth-of-type(6) {
display: none !important;
}
.wiki-content-table td:nth-of-type(6) {
display: none !important;
}
[[%%content{0}%%/module]]
[[/module]]
[[module ListPages range="." offset="@URL|0" urlAttrPrefix="list7"]]
[[%%content{0}%%module css]]
.wiki-content-table th:nth-of-type(7) {
display: none !important;
}
.wiki-content-table td:nth-of-type(7) {
display: none !important;
}
[[%%content{0}%%/module]]
[[/module]]
[[module ListPages range="." limit="@URL|0" urlAttrPrefix="list8"]]
[[%%content{0}%%module css]]
.wiki-content-table th:nth-of-type(8) {
display: none !important;
}
.wiki-content-table td:nth-of-type(8) {
display: none !important;
}
[[%%content{0}%%/module]]
[[/module]]
[[module ListPages range="." limit="@URL|0" urlAttrPrefix="list9"]]
[[%%content{0}%%module css]]
.wiki-content-table th:nth-of-type(9) {
display: none !important;
}
.wiki-content-table td:nth-of-type(9) {
display: none !important;
}
[[%%content{0}%%/module]]
[[/module]]
[[module ListPages range="." offset="@URL|0" urlAttrPrefix="list10"]]
[[%%content{0}%%module css]]
.wiki-content-table th:nth-of-type(10) {
display: none !important;
}
.wiki-content-table td:nth-of-type(10) {
display: none !important;
}
[[%%content{0}%%/module]]
[[/module]]
[[module ListPages range="." offset="@URL|0" urlAttrPrefix="list11"]]
[[%%content{0}%%module css]]
.wiki-content-table th:nth-of-type(11) {
display: none !important;
}
.wiki-content-table td:nth-of-type(11) {
display: none !important;
}
[[%%content{0}%%/module]]
[[/module]]
[[module ListPages range="." offset="@URL|0" urlAttrPrefix="list12"]]
[[%%content{0}%%module css]]
.wiki-content-table th:nth-of-type(12) {
display: none !important;
}
.wiki-content-table td:nth-of-type(12) {
display: none !important;
}
[[%%content{0}%%/module]]
[[/module]]
[[module ListPages range="." offset="@URL|0" urlAttrPrefix="list15"]]
[[%%content{0}%%module css]]
.uvdv {
display: none !important;
}
[[%%content{0}%%/module]]
[[/module]]

[[module ListPages range="." limit="@URL|0"]]
[[%%content{0}%%module css]]
.wiki-content-table {
display: inline-block !important;
}
.en .ru a img,
.en .ko a img,
.en .原创 a img,
.en .fr a img,
.en .pl a img,
.en .es a img,
.en .th a img,
.en .jp a img,
.en .de a img,
.en .it a img,
.en .ua a img,
.en .pt a img,
.en .wanderers a img{
    font-size: 0% !important;
    width: 0px !important;
    height: 0px !important;
    float: none !important;
}

.ru .ru a img,
.ko .ko a img,
.cn .原创 a img,
.fr .fr a img,
.pl .pl a img,
.es .es a img,
.th .th a img,
.jp .jp a img,
.de .de a img,
.it .it a img,
.ua .ua a img,
.pt .pt a img,
.wanderers .wanderers a img{
    font-size: 100% !important;
    width: 16px !important;
    height: 11px !important;
    float: right !important;
}
[[%%content{0}%%/module]]
[[/module]]
[[=]]
[[span class="pageNum"]]
[[module ListPages separate="no" category="@URL|*" tags="@URL" created_at="@URL" updated_at="@URL" created_by="@URL" rating="@URL" votes="@URL" link_to="@URL" offset="@URL|0" name="@URL" limit="@URL|0" perPage="@URL|20" parent="@URL" order="@URL|created_at desc"]]
[[span style="display:none"]]共%%total_or_limit%%个结果[[/span]]\
[[/module]]
[[module ListPages separate="no" category="@URL|*" tags="@URL" created_at="@URL" updated_at="@URL" created_by="@URL" rating="@URL" votes="@URL" link_to="@URL" offset="@URL|0" name="@URL" limit="@URL|0" perPage="@URL|20" parent="@URL" order="@URL|created_at desc" urlAttrPrefix="metatitle"]]
[[span style="display:none"]]共%%total_or_limit%%个结果[[/span]]\
[[/module]]
[[/span]]
[[span class="objectColor"]]##00FF00|●##:Safe    ##FFDD00|●##:Euclid    ##FF0000|●##:Keter    ##000000|●##:Thaumiel    ##777777|●##:机密分级    ##77FFFF|●##:已解明    ##9900FF|●##:无效化[[/span]]
[[module ListPages separate="no" category="@URL|*" wrapper="no" tags="@URL" created_at="@URL" updated_at="@URL" created_by="@URL" rating="@URL" votes="@URL" link_to="@URL" offset="@URL|0" name="@URL" limit="@URL|0" perPage="@URL|20" parent="@URL" order="@URL|created_at desc"]]
[[head]]
[[table class="wiki-content-table"]]
[[row]][[hcell]]页面标题（原文链接）[[/hcell]]
[[hcell]]创建者[[/hcell]]
[[hcell]]创建日期[[/hcell]]
[[hcell]]最新更新[[/hcell]]
[[hcell]]最新更新日期[[/hcell]]
[[hcell]]最新讨论[[/hcell]]
[[hcell]]最新讨论日期[[/hcell]]
[[hcell]]讨论[[/hcell]]
[[hcell]]评分[[span class="uvdv"]](UV/DV)[[/span]][[/hcell]]
[[hcell]]内容长度[[/hcell]]
[[hcell]]子页面[[/hcell]]
[[hcell]]页面版本[[/hcell]][[/row]]
[[/head]]
[[body]]
[[row]]
[[cell]][[span_]][[/span]]
%%index%%. [[span class="object"]][[span class="%%tags%%" style="font-size:0%"]]● [[/span]][[/span]][[span_]][[/span]]
%%title_linked%% [[span_]][[/span]]
[[span class="en"]][[span class="%%tags%%" style="font-size:100%"]][[image http://scp-wiki.wdfiles.com/local--files/main/us.png link="http://scp-wiki.wikidot.com/%%fullname%%"　width="16px" height="11px" style="float: right;" alt="🔗"]][[/span]][[/span]][[span_]][[/span]]
[[span class="ru"]][[span class="%%tags%%" style="font-size:0%"]][[image http://scp-wiki.wdfiles.com/local--files/main/ru.png link="http://scpfoundation.ru/%%fullname%%"　width="0px" height="0px" alt="🔗"]][[/span]][[/span]][[span_]][[/span]]
[[span class="ko"]][[span class="%%tags%%" style="font-size:0%"]][[image http://scp-wiki.wdfiles.com/local--files/main/kr.png link="http://ko.scp-wiki.net/%%fullname%%"　width="0px" height="0px" alt="🔗"]][[/span]][[/span]][[span_]][[/span]]
[[span class="cn"]][[span class="%%tags%%" style="font-size:0%"]][[image http://scp-wiki.wdfiles.com/local--files/main/cn.png link="http://scp-wiki-cn.wikidot.com/%%fullname%%"　width="0px" height="0px" alt="🔗"]][[/span]][[/span]][[span_]][[/span]]
[[span class="fr"]][[span class="%%tags%%" style="font-size:0%"]][[image http://scp-wiki.wdfiles.com/local--files/main/fr.png link="http://fondationscp.wikidot.com/%%fullname%%"　width="0px" height="0px" alt="🔗"]][[/span]][[/span]][[span_]][[/span]]
[[span class="pl"]][[span class="%%tags%%" style="font-size:0%"]][[image http://scp-wiki.wdfiles.com/local--files/main/pl.png link="http://scp-pl.wikidot.com/%%fullname%%"　width="0px" height="0px" alt="🔗"]][[/span]][[/span]][[span_]][[/span]]
[[span class="es"]][[span class="%%tags%%" style="font-size:0%"]][[image http://scp-wiki.wdfiles.com/local--files/main/es.png link="http://lafundacionscp.wikidot.com/%%fullname%%"　width="0px" height="0px" alt="🔗"]][[/span]][[/span]][[span_]][[/span]]
[[span class="th"]][[span class="%%tags%%" style="font-size:0%"]][[image http://scp-wiki.wdfiles.com/local--files/main/th.png link="http://scp-th.wikidot.com/%%fullname%%"　width="0px" height="0px" alt="🔗"]][[/span]][[/span]][[span_]][[/span]]
[[span class="jp"]][[span class="%%tags%%" style="font-size:0%"]][[image http://scp-wiki.wdfiles.com/local--files/main/jp.png link="http://ja.scp-wiki.net/%%fullname%%"　width="0px" height="0px" alt="🔗"]][[/span]][[/span]][[span_]][[/span]]
[[span class="de"]][[span class="%%tags%%" style="font-size:0%"]][[image http://scp-wiki.wdfiles.com/local--files/main/de.png link="http://scp-wiki-de.wikidot.com/%%fullname%%"　width="0px" height="0px" alt="🔗"]][[/span]][[/span]][[span_]][[/span]]
[[span class="it"]][[span class="%%tags%%" style="font-size:0%"]][[image http://scp-wiki.wdfiles.com/local--files/main/it.png link="http://fondazionescp.wikidot.com/%%fullname%%"　width="0px" height="0px" alt="🔗"]][[/span]][[/span]][[span_]][[/span]]
[[span class="ua"]][[span class="%%tags%%" style="font-size:0%"]][[image http://scp-wiki.wdfiles.com/local--files/main/ua.png link="http://scp-ukrainian.wikidot.com/%%fullname%%"　width="0px" height="0px" alt="🔗"]][[/span]][[/span]][[span_]][[/span]]
[[span class="pt"]][[span class="%%tags%%" style="font-size:0%"]][[image http://scp-wiki.wdfiles.com/local--files/main/pt.png link="http://scp-pt-br.wikidot.com/%%fullname%%" width="0px" height="0px" alt="🔗"]][[/span]][[/span]][[span_]][[/span]]
[[span class="wanderers"]][[span class="%%tags%%" style="font-size:0%"]][[image http://scp-wiki.wdfiles.com/local--files/main/SerpHand.png link="http://wanderers-library.wikidot.com/%%name%%"　width="0px" height="0px" alt="🔗"]][[/span]][[/span]][[span_]][[/span]]
[[/cell]]
[[cell]]%%created_by_linked%%[[/cell]]
[[cell]]%%created_at|%Y/%m/%d %H:%M|agohover %%[[/cell]]
[[cell]]%%updated_by_linked%%[[/cell]]
[[cell]]%%updated_at|%Y/%m/%d %H:%M|agohover %%[[/cell]]
[[cell]]%%commented_by_linked%%[[/cell]]
[[cell]]%%commented_at|%Y/%m/%d %H:%M|agohover %%[[/cell]]
[[cell]]%%comments%%[[/cell]]
[[cell]]%%rating%%[[span class="uvdv"]] (+[[#expr (%%rating_votes%%-%%rating%%)/2+%%rating%% ]]/-[[#expr (%%rating_votes%%-%%rating%%)/2 ]])[[/span]][[/cell]]
[[cell]]%%size%%[[/cell]]
[[cell]]%%children%%[[/cell]]
[[cell]]%%revisions%%[[/cell]][[/row]]
[[/body]]
[[foot]]
[[/table]]
[[/foot]]
[[/module]]
[[/=]]

[!--
以下模块用于生成html模块：获取并储存文档标题与显示结果列表。
--]

[[module ListPages range="." limit="@URL|0" urlAttrPrefix="metatitle"]]
[[%%content{0}%%module css]]
.pager {
display: none;
}
[[%%content{0}%%/module]]
[[div style="display:none"]]
[[%%content{0}%%html]]
<script type="text/javascript" src="http://ja.scp-wiki.net/scpauthorssearch/code/1"></script>
<script type="text/javascript">
var textB, textA, textL;
var alltext = new Array(2);
var finish = 0;

document.addEventListener("DOMContentLoaded",function(){
    alltext[0] = ["Joke", "EX", "001", "arc", "decommissioned"];
    alltext[1] = [];
    for(var i = 0; i < alltext[0].length; i++){
     alltext[1][i] = convURL(alltext[0][i]);
    }
    finish = 1;
});

function checkLoad(){
    return finish;
}

//内部链接语法([[[页面名称]]])转换为URL
function convURL(cat){
    var container = document.getElementById(cat);
    if(container == null){
     return;
    }
    var fulltext = document.getElementById(cat).innerHTML;
    while(fulltext.indexOf("[[[") >= 0){
     textB = fulltext.substring(0, fulltext.indexOf("[[["));
     fulltext = fulltext.substring(fulltext.indexOf("[[[") + 2, fulltext.length);
     textA = fulltext.substring(fulltext.indexOf("]]]") + 3, fulltext.length);
     fulltext = fulltext.substring(0, fulltext.indexOf("]]]") + 1);
     if(fulltext.indexOf("|") >= 0){
     textL = fulltext.substring(fulltext.indexOf("|") , fulltext.length);
     fulltext =  fulltext.substring(0, fulltext.indexOf("|"));
     }else{
     textL = "";
     }
     fulltext = fulltext.toLowerCase();
     fulltext = fulltext.replace(/[^a-z0-9:\]\[]/g, "-");
     while(fulltext.indexOf("--") >= 0){
     fulltext = fulltext.replace( /--/g , "-" ) ;
     }
    fulltext = textB + fulltext + textL + textA;
    }
    while(fulltext.indexOf("/@/@") >= 0){
     fulltext = fulltext.replace( "/@/@" , "" ) ;
    }
    return fulltext;
}

function startSearch0(object, cat){
    for(var i = 0; i < alltext[0].length; i++){
     if(alltext[0][i] == cat){
     var fulltext = alltext[1][i];
     break;
     }
    }
    //读取直到换行
    var fulltextSmall = fulltext.toLowerCase();
    if(fulltextSmall.indexOf(object)>=0){
     //避免在文档标题或链接语法中添加了与pagename不同的scp编号的情况，并获取indexOf值
     var resultTargetSCPExistArea = removeDummyNumber(object,fulltextSmall);
     var targetStartPoint = fulltextSmall.indexOf(resultTargetSCPExistArea.list);
     fulltext = fulltext.substring(fulltextSmall.indexOf(resultTargetSCPExistArea.list),fulltext.length);
     //根据以上搜索结果分离相应的行
     fulltext = fulltext.substring(resultTargetSCPExistArea.index, fulltext.length);
     fulltext = fulltext.substring(0, fulltext.indexOf("\n"));

     //文字颜色
     while(fulltext.indexOf("##")>=0){
     fulltext = fulltext.replace( "##" , "<span style='color: #" ) ;
     fulltext = fulltext.replace( "|" , "'>" ) ;
     fulltext = fulltext.replace( "##" , "</span>" ) ;
     }

     //删除线
     while(fulltext.indexOf("--")>=0){
     fulltext = fulltext.replace( "--" , "<span style='text-decoration: line-through;'>" ) ;
     fulltext = fulltext.replace( "--" , "</span>" ) ;
     }

     //加粗
     while(fulltext.indexOf("**")>=0){
     fulltext = fulltext.replace( "**" , "<strong>" ) ;
     fulltext = fulltext.replace( "**" , "</strong>" ) ;
     }

     //斜体
     while(fulltext.indexOf("\/\/")>=0){
     fulltext = fulltext.replace( "\/\/" , "<em>" ) ;
     fulltext = fulltext.replace( "\/\/" , "</em>" ) ;
     }

     //等宽
     while(fulltext.indexOf("\{\{")>=0){
     fulltext = fulltext.replace( "\{\{" , "<tt>" ) ;
     fulltext = fulltext.replace( "\}\}" , "</tt>" ) ;
     }

     //下划线
     while(fulltext.indexOf("\_\_")>=0){
     fulltext = fulltext.replace( "\_\_" , "<span style='text-decoration: underline;'>" ) ;
     fulltext = fulltext.replace( "\_\_" , "</span>" ) ;
     }

     //上标
     while(fulltext.indexOf("\^\^")>=0){
     fulltext = fulltext.replace( "\^\^" , "<sup>" ) ;
     fulltext = fulltext.replace( "\^\^" , "</sup>" ) ;
     }

     //下标
     while(fulltext.indexOf("\,\,")>=0){
     fulltext = fulltext.replace( "\,\," , "<sub>" ) ;
     fulltext = fulltext.replace( "\,\," , "</sub>" ) ;
     }

     //文字大小
     while(fulltext.indexOf("[[size")>=0){
     fulltext = fulltext.replace( "[[size " , "<span style='font-size:" ) ;
     fulltext = fulltext.replace( "]]" , "'>" ) ;
     fulltext = fulltext.replace( "[[/size]]" , "</span>" ) ;
     }

     //span元素
     while(fulltext.indexOf("[[span")>=0){
     fulltext = fulltext.replace( "[[span" , "<span" ) ;
     fulltext = fulltext.replace( "]]" , ">" ) ;
     fulltext = fulltext.replace( "[[/span]]" , "</span>" ) ;
     }
     while(fulltext.indexOf("[[/span]]")>=0){
     fulltext = fulltext.replace( "[[/span]]" , "" ) ;
     }

     //剪切[]部分
     textA = fulltext;
     textL = "";
     while(textA.indexOf("]") >= 0){
     textB = textA.substring(0, textA.indexOf("]") + 1);
     textA = textA.substring(textA.indexOf("]") + 1, textA.length);
     if(textB.indexOf("[") >= 0){
     textL += textB;
     }
     }
     textA = textL + textA;
     if(textA == ""){
     if(fulltext.indexOf("|") >= 0){
     fulltext = fulltext.substring(fulltext.indexOf("|") + 1, fulltext.indexOf("]"));
     }else{
     fulltext = fulltext.substring(fulltext.indexOf(" ") + 1, fulltext.indexOf("]"));
     }
     }else{
     fulltext = textA;
     }
    }else{
     fulltext = " - <span style='color: #808080;'>[ERROR|获取标题失败]</span>";
    }
    return fulltext;
}
</script>
<!-- 在此处添加引用的页面的URL -->
<div id="en">
[[include :scp-wiki-cn:scp-series]]
[[include :scp-wiki-cn:scp-series-2]]
[[include :scp-wiki-cn:scp-series-3]]
[[include :scp-wiki-cn:scp-series-4]]
[[include :scp-wiki-cn:scp-series-5]]
</div>
<div id="ru">
[[include :scp-wiki-cn:scp-series-ru]]
</div>
<div id="ko">
[[include :scp-wiki-cn:scp-series-ko]]
</div>
<div id="cn">
[[include :scp-wiki-cn:scp-series-cn]]
[[include :scp-wiki-cn:scp-series-cn-2]]
</div>
<div id="fr">
[[include :scp-wiki-cn:scp-series-fr]]
</div>
<div id="pl">
[[include :scp-wiki-cn:scp-series-pl]]
</div>
<div id="es">
[[include :scp-wiki-cn:scp-series-es]]
</div>
<div id="th">
[[include :scp-wiki-cn:scp-series-th]]
</div>
<div id="jp">
[[include :scp-wiki-cn:scp-series-jp]]
[[include :scp-wiki-cn:scp-series-jp-2]]
</div>
<div id="de">
[[include :scp-wiki-cn:scp-series-de]]
</div>
<div id="it">
[[include :scp-wiki-cn:scp-series-it]]
</div>
<div id="ua">
[[include :scp-wiki-cn:scp-series-ua]]
</div>
<div id="pt">
[[include :scp-wiki-cn:scp-series-pt]]
</div>
<div id="wanderers"></div>
<div id="Joke">
[[include :scp-wiki-cn:joke-scps]]
[[include :scp-wiki-cn:joke-scps-ru]]
[[include :scp-wiki-cn:joke-scps-ko]]
[[include :scp-wiki-cn:joke-scps-cn]]
[[include :scp-wiki-cn:joke-scps-fr]]
[[include :scp-wiki-cn:joke-scps-pl]]
[[include :scp-wiki-cn:joke-scps-es]]
[[include :scp-wiki-cn:joke-scps-th]]
[[include :scp-wiki-cn:joke-scps-jp]]
[[include :scp-wiki-cn:joke-scps-de]]
[[include :scp-wiki-cn:joke-scps-pt]]
</div>
<div id="EX">
[[include :scp-wiki-cn:scp-ex]]
[[include :scp-wiki-cn:scp-ex-cn]]
</div>
<div id="001">
[[include :scp-wiki-cn:scp-001]]
[[include :scp-wiki-cn:scp-001-ko]]
[[include :scp-wiki-cn:scp-cn-001]]
[[include :scp-wiki-cn:scp-001-fr]]
[[include :scp-wiki-cn:scp-001-jp]]
</div>
<div id="arc">
[[include :scp-wiki-cn:archived-scps]]
[[include :scp-wiki-cn:scp-removed]]
</div>
<div id="decommissioned">
[[include :scp-wiki-cn:decommissioned-scps-arc]]
</div>
[[/html]]
[[/div]]
[[%%content{0}%%html]]
<style>
@import url(http://d3g0gp89917ko0.cloudfront.net/v--2f62f70fa3c2/common--theme/base/css/style.css);
@import url(http://scp-wiki-cn.wikidot.com/component:theme/code/1);
img.image {
width: 16px !important;
height: 11px !important;
float: right !important;
}
</style>
<script type="text/javascript" src="http://scp-jp.wdfiles.com/local--files/japanese-syntax/scpHTMLblockCtrl_ver1_ex.js"></script>
<script type="text/javascript" src="http://scp-wiki-cn.wikidot.com/tag-search/code/1"></script>
<script type="text/javascript">
isHTMLblockHide = true;
var mainlist = [];
var listCheck = [];
var timestamp = new Date();
var frameCheck, ix, listMax, listCount, loadFinish, flagOC, mframeNo, pageNo, totalPages;
var timerID;

document.addEventListener("DOMContentLoaded",function(){
    var form = document.forms.mainForm;
    var nowURL = document.referrer;
    if(nowURL.search("list1_limit") >= 0){
     listCheck[0] = true;
     flagOC = 0;
    }else{
     listCheck[0] = false;
     flagOC = 1;
    }
    if(nowURL.search("list2_limit") >= 0){
     listCheck[1] = false;
    }else{
     listCheck[1] = true;
    }
    if(nowURL.search("list3_limit") >= 0){
     listCheck[2] = false;
    }else{
     listCheck[2] = true;
    }
    if(nowURL.search("list4_offset") >= 0){
     listCheck[3] = true;
    }else{
     listCheck[3] = false;
    }
    if(nowURL.search("list5_offset") >= 0){
     listCheck[4] = true;
    }else{
     listCheck[4] = false;
    }
    if(nowURL.search("list6_offset") >= 0){
     listCheck[5] = true;
    }else{
     listCheck[5] = false;
    }
    if(nowURL.search("list7_offset") >= 0){
     listCheck[6] = true;
    }else{
     listCheck[6] = false;
    }
    if(nowURL.search("list8_limit") >= 0){
     listCheck[7] = false;
    }else{
     listCheck[7] = true;
    }
    if(nowURL.search("list9_limit") >= 0){
     listCheck[8] = false;
    }else{
     listCheck[8] = true;
    }
    if(nowURL.search("list10_offset") >= 0){
     listCheck[9] = true;
    }else{
     listCheck[9] = false;
    }
    if(nowURL.search("list11_offset") >= 0){
     listCheck[10] = true;
    }else{
     listCheck[10] = false;
    }
    if(nowURL.search("list12_offset") >= 0){
     listCheck[11] = true;
    }else{
     listCheck[11] = false;
    }
    listCheck[12] = true;
    if(nowURL.search("list14_limit") >= 0){
     listCheck[13] = true;
    }else{
     listCheck[13] = false;
    }
    if(nowURL.search("list15_offset") >= 0){
     listCheck[14] = true;
    }else{
     listCheck[14] = false;
    }
    form.list1.checked = listCheck[0];
    form.list2.checked = listCheck[1];
    form.list3.checked = listCheck[2];
    form.list4.checked = listCheck[3];
    form.list5.checked = listCheck[4];
    form.list6.checked = listCheck[5];
    form.list7.checked = listCheck[6];
    form.list8.checked = listCheck[7];
    form.list9.checked = listCheck[8];
    form.list10.checked = listCheck[9];
    form.list11.checked = listCheck[10];
    form.list12.checked = listCheck[11];
    form.list13.checked = listCheck[12];
    form.list14.checked = listCheck[13];
    form.list15.checked = listCheck[14];
    if(nowURL.indexOf("/p/") >= 0){
     pageNo = nowURL.substring(nowURL.indexOf("/p/") + 3, nowURL.length);
     //pageNo = pageNo.replace( "/p/ " , "" );
    }else if(nowURL.indexOf("/metatitle_p/") >= 0){
     pageNo = nowURL.substring(nowURL.indexOf("/metatitle_p/") + 13, nowURL.length);
     //pageNo = pageNo.replace( "/metatitle_p/ " , "" );
    }else{
     pageNo = 1;
    }
    pageNo = parseFloat(pageNo);
    frameCheck = -1;
    listMax = 250;
    listCount = 0;
    loadFinish = 0;
    mframeNo = -1;
    clock();
});

function clock() {
    if(frameCheck == -1){
     searchLoad();
     setTimeout(clock,50);
    }
    if(frameCheck >= 0 && loadFinish == 0){
     loadFinish = window.parent.window.frames[frameCheck].checkLoad();
     if(loadFinish > 0){
     for(var i in SearchSettingParam.BranchData){
     if(i == "undefinedDefault"){
     continue;
     }
     window.parent.window.frames[frameCheck].alltext[0].push(i);
     window.parent.window.frames[frameCheck].alltext[1].push(window.parent.window.frames[frameCheck].convURL(i));
     }
     writeList();
     }
     setTimeout(clock,50);
    }
}

function searchLoad(){
    for(ix=0; ix <= window.parent.window.frames.length; ix++){
     try{
     if(typeof(window.parent.window.frames[ix].startSearch0) == "function"){
     frameCheck = ix;
     break;
     }
     }catch(e){
     }
    }
}

function resList(num, frame){
    listMax = num;
    mframeNo = frame;
    writeList();
}

function setList(){
    var form = document.forms.mainForm;
    listCheck[0] = form.list1.checked;
    listCheck[1] = form.list2.checked;
    listCheck[2] = form.list3.checked;
    listCheck[3] = form.list4.checked;
    listCheck[4] = form.list5.checked;
    listCheck[5] = form.list6.checked;
    listCheck[6] = form.list7.checked;
    listCheck[7] = form.list8.checked;
    listCheck[8] = form.list9.checked;
    listCheck[9] = form.list10.checked;
    listCheck[10] = form.list11.checked;
    listCheck[11] = form.list12.checked;
    listCheck[12] = form.list13.checked;
    listCheck[13] = form.list14.checked;
    listCheck[14] = form.list15.checked;
    writeList();
    if(mframeNo >=0){
     window.parent.window.frames[mframeNo].resList2(listCheck);
    }
}

function writeList(){
    var fulltitle, i, j;
    var countRow = 1;
    if(listCheck[14] == true){
     mainlist[0] = ["编号 - 标题", "创建者", "创建日期", "最新更新者", "最新更新日期", "最新讨论者", "最新讨论日期", "讨论", "评分(UV/DV)", "内容长度", "子页面", "页面版本"];
    }else{
     mainlist[0] = ["编号 - 标题", "创建者", "创建日期", "最新更新者", "最新更新日期", "最新讨论者", "最新讨论日期", "讨论", "评分", "内容长度", "子页面", "页面版本"];
    }
    if(listCheck[12] == true){
     var chara = "<tr><th>" + mainlist[0][0] + "</th>";
    }else{
     var chara = "<tr><th>页面标题</th>";
    }
    for(j = 1; j < 12; j++){
     if(listCheck[j] == true){
     countRow++;
     chara += "<th>" + mainlist[0][j] + "</th>";
     }
    }
    if(listCheck[0] == true && flagOC == 1){
     document.getElementById("listOC").style.display="inline-block";
    }else{
     document.getElementById("listOC").style.display="none";
    }
    chara += "</tr>";
    for(i = 1; i < mainlist.length; i++){
     if(mainlist[i] != null){
     fulltitle = i + ". ";
     if(listCheck[0] == true){
     fulltitle += mainlist[i][0];
     }
     fulltitle += mainlist[i][13];
     if(listCheck[12] == true){
     var metatitle = selectTitle(mainlist[i][15], mainlist[i][12]);
     if(metatitle != mainlist[i][16]){
     fulltitle += metatitle;
     }
     }
     fulltitle += mainlist[i][14];
     chara += "<tr><td>" + fulltitle + "</td>";
     for(j = 1; j < 12; j++){
     if(listCheck[j] == true){
     if(j == 8){
     chara += "<td>" + votesText(mainlist[i][j]) + "</td>";
     }else{
     chara += "<td>" + mainlist[i][j] + "</td>";
     }
     }
     }
     chara += "</tr>";
     if(listCheck[13] == true){
     chara += tagList(mainlist[i][15], countRow);
     }
     }
    }
    document.getElementById("SCPlist").innerHTML = chara;
    writePager();
    correctIframeSize();
}

function resData(contents){
    var tags = contents[1];
    totalPages = contents[16];
    listCount += 1;
    var wikiurl = SearchSettingParam.BranchData.cn.url;
    mainlist[ contents[0] ] = [selectOC(tags), userName(contents[5]), convDates(contents[6]), userName(contents[7]), convDates(contents[8]), userName(contents[9]), convDates(contents[10]), contents[11], contents[12], contents[13], contents[14], contents[15], contents[3], "<a href='" + wikiurl + contents[4] + "' target='Page1'>" + contents[2] + "</a> ", selectBranch(tags, contents[3], contents[4]), tags,contents[2]];
    writeList();
}

function selectTitle(tags, scpNo){
    SearchSettingParam.getBranchByTag(tags);
    var metatitle = "";
    if(SearchSettingParam.RecentlyTagData.Branch != "undefinedDefault"){
     if(tags.search("scp") >= 0){
     if(tags.search("搞笑") >= 0){
     metatitle = startSearch1(scpNo,"Joke");
     }else if(tags.search("已解明") >= 0){
     metatitle = startSearch1(scpNo,"EX");
     }else if(tags.search("001提案") >= 0){
     metatitle = startSearch1(scpNo,"001") + " （001提案）";
     }else if(tags.search("被归档") >= 0 || tags.search("旧页面") >= 0){
     metatitle = startSearch1(scpNo,"arc");
     }else if(tags.search("被废除") >= 0){
     metatitle = startSearch1(scpNo,"decommissioned");
     }else{
     metatitle = startSearch1(scpNo,SearchSettingParam.RecentlyTagData.Branch);
     }
     }else{
     if(tags.search("goi格式") >= 0){
     metatitle = " （GOI格式）";
     }else if(tags.search("故事") >= 0){
     metatitle = " （故事）";
     }else if(tags.search("艺术作品") >= 0){
     metatitle = " （艺术作品）";
     }else if(tags.search("中心") >= 0){
     metatitle = " （中心页）";
     }else if(tags.search("作者") >= 0){
     metatitle = " （作者）";
     }else if(tags.search("文章") >= 0){
     metatitle = " （文章）";
     }else if(tags.search("指导") >= 0){
     metatitle = " （指导）";
     }else if(tags.search("补充资料") >= 0){
     metatitle = " （补充资料）";
     }else if(tags.search("掩藏页") >= 0){
     metatitle = " （掩藏页）";
     }
     }
    }
    return metatitle;
}

function startSearch1(scpNo, cat) {
    if(frameCheck >= 0 && loadFinish > 0){
     var s = window.parent.window.frames[frameCheck].startSearch0(scpNo, cat);
    }else{
     var s = " - <a href='javascript:void(0);' onclick='writeList()'>如果长时间没有加载，请点击这里</a>";
    }
    return s;
}

function selectOC(tags){
    var objectClass = "";
    if(tags.search("无效化") >= 0){
     objectClass += "<span style='color:#9900FF'>●</span>";
    }
    if(tags.search("thaumiel") >= 0){
     objectClass += "<span style='color:#000000'>●</span>";
    }
    if(tags.search("keter") >= 0){
     objectClass += "<span style='color:#FF0000'>●</span>";
    }
    if(tags.search("euclid") >= 0){
     objectClass += "<span style='color:#FFDD00'>●</span>";
    }
    if(tags.search("safe") >= 0){
     objectClass += "<span style='color:#00FF00'>●</span>";
    }
    if(tags.search("机密分级") >= 0){
     objectClass += "<span style='color:#777777'>●</span>";
    }
    if(tags.search("已解明") >= 0){
     objectClass += "<span style='color:#77FFFF'>●</span>";
    }
    objectClass += " ";
    return objectClass;
}

function selectBranch(tags,pagename,page){
    var branchSymbol = SearchSettingParam.getBranchByTag(tags);
    var branch = "";
    if(SearchSettingParam.BranchData[branchSymbol].createSource){
     var branchData = SearchSettingParam.BranchData[branchSymbol];
     var name;
     if(branchSymbol != "wanderers"){
     name = page;
     }else{
     name = pagename;
     }
     branch = "<a href='" + branchData.url + name + "' target='_top'><img src='"+branchData.flag+"' alt='🔗' class='image' /></a>";
    }
    return branch;
}

function convDates(num){
    if(num == ""){
     var s = "<center>-</center>";
    }else{
     num = num.replace( "%%date\|" , "" ) ;
     num = num.replace( "%%" , "" ) ;
     num = new Date(num * 1000);
     var s = "<span display='inline-block'>" + num.getFullYear() + "/" + (num.getMonth() + 1) + "/" + num.getDate() + "</span> <span display='inline-block'>" + set2fig( num.getHours() ) + ":" + set2fig( num.getMinutes() ) + "</span>";
    }
    return s;
}

function set2fig(num) {
    var ret;
    if( num < 10 ) { ret = "0" + num; }
    else { ret = num; }
    return ret;
}

function userName(name){
    if(name[0] == ""){
     var s = "<center>-</center>";
    }else if(name[0] == "(user deleted)"){
     var s = "<center>(user deleted)</center>";
    }else{
     var ss = name[0].replace(/\s/g, "-");
     var s = "<span class='printuser avatarhover'><a href='http://www.wikidot.com/user:info/" +
ss +
"' onclick='WIKIDOT.page.listeners.userInfo(" +
name[1] +
")\; return false\;' target='page3'><img class='small' src='http://www.wikidot.com/avatar.php\?userid=" +
name[1] +
"\&amp\;amp\;size=small\&amp\;amp\;timestamp=" +
timestamp.getTime() +
"' alt='" +
name[0] +
"' style='background-image:url(http://www.wikidot.com/userkarma.php\?u=" +
name[1] +
")' /></a><a href='http://www.wikidot.com/user:info/" +
ss +
"' onclick='WIKIDOT.page.listeners.userInfo(" +
name[1] +
")\; return false\;' target='page3'>" +
name[0] +
"</a></span>";
    }
    return s;
}

function tagList(tag, row){
    var tags = tag.split(" ");
    var s ="<tr><td colspan='" + row + "'><strong>全部标签一览：</strong> ";
    for(var i = 0; i < tags.length; i++){
     s += "<a href='javascript:void(0)\;' onclick='tagSearch(\"" + tags[i] + "\")'>" + tags[i] + "</a> ";
    }
    s += "</td></tr>"
    return s;
}

function votesText(votes){
    if(listCheck[14] == true){
     var s = votes[0] + " (+" + ( ( votes[1] - votes[0] ) / 2 +  votes[0] ) + "/-" + ( votes[1] - votes[0] ) / 2 + ")";
    }else{
     var s = votes[0];
    }
    return s;
}

function writePager(){
    var pageCount = (totalPages - 1 - ( (totalPages - 1) % listMax)) / listMax + 1;
    if(pageCount == 1){
     var chara = "";
     document.getElementById("pagerArea").style.display="none";
    }else{
     document.getElementById("pagerArea").style.display="block";
     var chara = "<span class='pager-no'>page " + pageNo + " of " + pageCount + "</span>";
     if(pageNo > 10){
     chara += "<span class='target'><a href='javascript:void(0)\;' onclick='pageChange(" + (pageNo - 10) + ")'>&laquo\;&laquo\;</a></span>";
     }
     if(pageNo > 1){
     chara += "<span class='target'><a href='javascript:void(0)\;' onclick='pageChange(" + (pageNo - 1) + ")'>&laquo\; previous </a></span>";
     if(pageNo < 7){
     for(var i = 1; i < pageNo; i++){
     chara += "<span class='target'><a href='javascript:void(0)\;' onclick='pageChange(" + i + ")'>" + i + "</a></span>";
     }
     }else{
     chara += "<span class='target'><a href='javascript:void(0)\;' onclick='pageChange(1)'>1</a></span>";
     chara += "<span class='target'><a href='javascript:void(0)\;' onclick='pageChange(2)'>2</a></span>";
     chara += "<span class='dots'>...</span>";
     chara += "<span class='target'><a href='javascript:void(0)\;' onclick='pageChange(" + (pageNo - 2) + ")'>" + (pageNo - 2) + "</a></span>";
     chara += "<span class='target'><a href='javascript:void(0)\;' onclick='pageChange(" + (pageNo - 1) + ")'>" + (pageNo - 1) + "</a></span>";
     }
     }
     chara += "<span class='current'>" + pageNo + "</span>";
     if(pageNo <= pageCount - 1){
     if(pageNo > pageCount -  6){
     for(i = pageNo + 1; i <= pageCount; i++){
     chara += "<span class='target'><a href='javascript:void(0)\;' onclick='pageChange(" + i + ")'>" + i + "</a></span>";
     }
     }else{
     chara += "<span class='target'><a href='javascript:void(0)\;' onclick='pageChange(" + (pageNo + 1) + ")'>" + (pageNo + 1) + "</a></span>";
     chara += "<span class='target'><a href='javascript:void(0)\;' onclick='pageChange(" + (pageNo + 2) + ")'>" + (pageNo + 2) + "</a></span>";
     chara += "<span class='dots'>...</span>";
     chara += "<span class='target'><a href='javascript:void(0)\;' onclick='pageChange(" + (pageCount - 1) + ")'>" + (pageCount - 1) + "</a></span>";
     chara += "<span class='target'><a href='javascript:void(0)\;' onclick='pageChange(" + pageCount + ")'>" + pageCount + "</a></span>";
     }
     chara += "<span class='target'><a href='javascript:void(0)\;' onclick='pageChange(" + (pageNo + 1) + ")'> next &raquo\;</a></span>";
     }
     if(pageNo <= pageCount - 10){
     chara += "<span class='target'><a href='javascript:void(0)\;' onclick='pageChange(" + (pageNo + 10) + ")'>&raquo\;&raquo\;</a></span>";
     }
    }
    document.getElementById("pagerArea").innerHTML = chara;
    document.getElementById("pagerArea2").innerHTML = chara;
}

function tagSearch(tag){
    if(mframeNo >= 0){
     window.parent.window.frames[mframeNo].startSearch(0, tag, 1);
    }
}

function pageChange(No){
    if(mframeNo >= 0){
     window.parent.window.frames[mframeNo].startSearch(0, "", No);
    }
}

</script>
<center><div id="listOC"><span style="color: #00ff00">●</span>:Safe <span style="color: #ffdd00">●</span>:Euclid <span style="color: #ff0000">●</span>:Keter <span style="color: #000000">●</span>:Thaumiel <span style="color: #777777">●</span>:机密分级 <span style="color: #77ffff">●</span>:已解明 <span style="color: #9900ff">●</span>:无效化</div></center>
<div id="pagerArea" class="pager"></div>
<table class="wiki-content-table" id="SCPlist">
<tr>
<th>页面标题（原文链接）</th>
<th>页面创建者</th>
<th>创建日期</th>
<th>最新更新者</th>
<th>最新更新日期</th>
<th>最新讨论者</th>
<th>最新讨论日期</th>
<th>讨论</th>
<th>评分(UV/DV)</th>
<th>内容长度</th>
<th>子页面</th>
<th>页面版本</th>
</tr>
</table>
<div id="pagerArea2" class="pager"></div>
<table style="margin-right:auto; margin-left:auto; width: 95%; border: 1px solid silver;">
<tr>
<td style="text-align: left; border: 0px">
<center><h2>显示项目</h2></center>
<form name='mainForm'>
<p><strong>一般：</strong>创建者<input type="checkbox" name="list2" onChange="setList()">/
创建日期<input type="checkbox" name="list3" onChange="setList()">/
讨论<input type="checkbox" name="list8" onChange="setList()">/
评分<input type="checkbox" name="list9" onChange="setList()"></p>
<p><strong>更新・讨论：</strong>最新更新者<input type="checkbox" name="list4" onChange="setList()">/
最新更新日期<input type="checkbox" name="list5" onChange="setList()">/
最新讨论者<input type="checkbox" name="list6" onChange="setList()">/
最新讨论日期<input type="checkbox" name="list7" onChange="setList()"></p>
<p><strong>统计数据：</strong>内容长度<input type="checkbox" name="list10" onChange="setList()">/
子页面<input type="checkbox" name="list11" onChange="setList()">/
页面版本<input type="checkbox" name="list12" onChange="setList()">/
评分详细<input type="checkbox" name="list15" onChange="setList()"></p>
<p><strong>其他：</strong>项目等级<input type="checkbox" name="list1" onChange="setList()">/
SCP文档标题<input type="checkbox" name="list13" onChange="setList()">/
全部标签一览<input type="checkbox" name="list14" onChange="setList()"></p>
</form>
</td>
</tr>
</table>
<div id="scpHTMLblockResizeSwitch"></div>
[[/html]]
[[/module]]

[[div class="datahtml"]]
[[module ListPages category="@URL|*" tags="@URL" created_at="@URL" updated_at="@URL" created_by="@URL" rating="@URL" votes="@URL" link_to="@URL" offset="@URL|0" name="@URL" limit="@URL|0" perPage="@URL|20" parent="@URL" order="@URL|created_at desc" urlAttrPrefix="metatitle"]]
[[%%content{0}%%html]]
<script type="text/javascript">
var check, i;
var timerID;

//同步数据
document.addEventListener("DOMContentLoaded", function(event) {
check = -1;
clock();
});
function clock() {
if(check == -1){
searchLoad();
setTimeout(clock,100);
}
}
function searchLoad(){
for(i=0; i <= window.parent.window.frames.length; i++){
try{
if(typeof(window.parent.window.frames[i].resData) == "function"){
check = i;
break;
}
}catch(e){
}
}
if(check >= 0){
sendData();
}
}

//发送页面数据
function sendData(){
var contents = [%%index%%, "%%tags%%", document.getElementById("getTitle").innerHTML, "%%name%%", "%%fullname%%",
["%%created_by%%",%%created_by_id%% ], "%%created_at%%",
["%%updated_by%%",%%updated_by_id%% ], "%%updated_at%%",
["%%commented_by%%","%%commented_by_id%%" ], "%%commented_at%%",
%%comments%%, [%%rating%%, %%rating_votes%% ], %%size%%, %%children%%, %%revisions%%, %%total_or_limit%%];
window.parent.frames[check].resData(contents);
}
</script>
<div id="getTitle" style="display:none">%%title%%</div>
[[/html]]
[[/module]]
[[/div]]
[[div class="content-panel standalone" style="width: 95%; margin: 0 auto 20px; padding: 10px 20px;"]]
[[html]]
<style>
@import url(http://d3g0gp89917ko0.cloudfront.net/v--2f62f70fa3c2/common--theme/base/css/style.css);
@import url(http://scp-wiki-cn.wikidot.com/component:theme/code/1);
#tagField a {
display: inline-block;
}
input[type="button"]{
cursor:pointer;
}
</style>

<script type="text/javascript" src="http://scp-wiki-cn.wikidot.com/fragment:tag-search/code/1"></script>
<script type="text/javascript" src="http://scp-jp.wdfiles.com/local--code/scpmetatitlesearch/4"></script>
<script type="text/javascript">

//重要：此页的URL地址
var baseURL = "http://scp-wiki-cn.wikidot.com/tag-search";

//获取客户端浏览器
var Browser = getBrowser();

//显示顺序
var orderSetteing = {
    "created_at desc":"创建日期较新",
    "created_at":"创建日期较早",
    "rating desc":"评分较高",
    "rating":"评分较低",
    "updated_at desc":"更新日期较新",
    "updated_at":"更新日期较早",
    "size desc":"内容长度较多",
    "size":"内容长度较少",
    "votes desc":"总票数较多",
    "votes":"总票数较少",
    "comments desc":"讨论数较多",
    "comments":"讨论数较少",
    "revisions desc":"页面版本较多",
    "revisions":"页面版本较少",
    "name desc":"页面标题降序",
    "name":"页面标题升序",
    "random":"随机"
}

//评分
var rateSetting = {
    "=":"相等",
    ">=":"以上或相等",
    "<=":"以下或相等",
    "<>":"不等于",
    ">":"以上",
    "<":"以下"
}

var NotationYear = "年";

//月份
var NotationMonth={
    'year_round':'全年',
    'm01':"1月",
    'm02':"2月",
    'm03':"3月",
    'm04':"4月",
    'm05':"5月",
    'm06':"6月",
    'm07':"7月",
    'm08':"8月",
    'm09':"9月",
    'm10':"10月",
    'm11':"11月",
    'm12':"12月"
}

var NotationTimeSpan1 = {
    '=':"期间",
    '>=':"当月及以后",
    '<=':"当月及以前",
    '>':"以后",
    '<':"以前"
}

var NotationTimeSpan2 = {
    '%20hours':"小时",
    '%20day':"日",
    '%20week':"周",
    '%20month':"月"
}

/*实际运行*/
var tagTable = new Array();
var tagNumber, frameCheck;
var form;
var listMax;

//初始化设置默认值
document.addEventListener("DOMContentLoaded",function(){
    form = document.forms.mainForm;
    /*根据上述设置生成检索表单*/
    createFirstTagSelecter();
    createSearchSelecter("order",orderSetteing);//orderSelecter
    createSearchSelecter("rating1",rateSetting);//rateSelecter
    createSearchSelecter("votes1",rateSetting);//rateSelecter
    tagNumber = 0;
    createTimeForm(1);
    createTimeForm(2);
    //恢复检索设置状态
    var check = document.referrer.split(baseURL).join("");
    if(check.length > 1)restoreSearchForm(check);
    if(form.page.value != null){
     listMax = form.page.value;
    }else{
     listMax = 20;
    }
    frameCheck = -1;
    searchClock();
});

function searchClock() {
    if(frameCheck == -1){
     searchLoad();
     setTimeout(searchClock,100);
    }
}

function searchLoad(){
    for(i=0; i <= window.parent.window.frames.length; i++){
     try{
     if(typeof(window.parent.window.frames[i].resList) == "function"){
     frameCheck = i;
     break;
     }
     }catch(e){
     }
    }
    sendList();
}

function createFirstTagSelecter(){
//根据数组生成第1级菜单
    var option;
    for(var i in FirstCategory){
        option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        form.tag1.appendChild(option);
    }
}

function createSearchSelecter(targetName,setting){
    for(var i in setting){
        option = document.createElement("option");
        option.value = i;
        option.innerHTML = setting[i];
        form.elements[targetName].appendChild(option);
    }
}

/*生成检索URL*/


//转换并组合URL
function startSearch(flag, tag, pageNo){
    var passingURL = baseURL;
    var oldURL = passingURL;
    //生成当前时刻Date变量
    var limitNum = new Date;
    limitNum = Math.abs( limitNum.getTime() ) + 10000;
    //注意addOrder()必须是最后一个，否则在恢复检索设置时会出现错误
    if(tag == ""){
     passingURL = passingURL + addTag() + addCtime() + addUtime() + addCategory() + addAuthor() + addRate() + addVotes() + addOffset() + "/" + addTitle() + "limit/" + limitNum + addPpage() + addParent() + addList() + addOrder() + addPageno(pageNo);
    }else{
     passingURL = passingURL + "/" + addTitle() + "tag/" + tag + addCtime() + addUtime() + addCategory() + addAuthor() + addRate() + addVotes() + addOffset() + "/" + addTitle() + "limit/" + limitNum + addPpage() + addParent() + addList() + addOrder() + addPageno(pageNo);
    }
    if(flag == 0){
     parent.location.href = passingURL;
    }else{
     window.open(passingURL, "_blank");
    }
}

//URL添加标签
function addTag(){
    var i;
    if((form.check1.checked == true) && (tagNumber > 0)){
        var a = "/" + addTitle() + "tag/";
        for(i = 0; i < tagNumber; i++){
        if(i > 0){a = a + ",";}
        if(tagTable[i][0] == 1){
        a = a + "%2b";
        }else if(tagTable[i][0] == 2){
        a = a + "-";
        }
        a = a + tagTable[i][1];
        }
    }else{
        var a = "";
    }
    return a;
}

//URL添加创建日期
function addCtime(){
    var a = "";
    if(form.check2.checked){
        a = constructTimeParameter(1);
    }
    return a;
}
//URL添加更新日期
function addUtime(){
    var a = "";
    if(form.check3.checked){
        a = constructTimeParameter(2);
    }
    return a;
}

function constructTimeParameter(type){
    if(type < 2){
        var a = "/" + addTitle() + "created_at/";
    }else{
        var a = "/" + addTitle() + "updated_at/";
    }
    var initialCode = (type < 2)?"C":"U";
    var runtype = Number(getRadioValue(initialCode + "type"));
    switch(runtype){
        case 0:
            //指定年月
            a += form.elements["option" + type].value + form.elements["years" + type].value;
            if(form.elements["month" + type].value != "year_round")a += "."+form.elements["month" + type].value;
        break;
        case 1:
            //指定日期
            var dayNow = new Date();
            var target = (type < 2)?"created":"updated";
            var dayOld = decDay(form.elements[target].value);
            var diff = Math.ceil( (dayNow.getTime() - dayOld.getTime()) / (1000 * 60 * 60) );
            a += ("last%20"+ diff + "%20hours");
            if(diff < 1)a = "";
        break;
        case 2:
            //指定期间
            a += form.elements[initialCode + "daterange"].value + (form.elements[initialCode + "num1"].value + form.elements[initialCode + "num2"].value);
        break;
    }
    return a;
}

//URL添加分类
function addCategory(){
    if(form.check12.checked == true){
        var a = "/" + addTitle() + "category/" + form.category.value;
    }else{
        var a = "";
    }
    return a;
}
//URL添加创建者
function addAuthor(){
    if(form.check4.checked == true){
        var a = "/" + addTitle() + "created_by/" + form.author.value;
    }else{
        var a = "";
    }
    return a;
}
//URL添加评分
function addRate(){
    if((form.check5.checked == true) && (form.rating2.value != "")){
        var a = "/" + addTitle() + "rating/" + form.rating1.value + form.rating2.value;
    }else{
        var a = "";
    }
    return a;
}
//URL添加总票数
function addVotes(){
    if((form.check11.checked == true) && (form.votes2.value != "")){
        var a = "/" + addTitle() + "votes/" + form.votes1.value + form.votes2.value;
    }else{
        var a = "";
    }
    return a;
}
//URL添加偏移值
function addOffset(){
    var form = document.forms.mainForm;
    if((form.check6.checked == true) && (form.offset.value != "")){
        var a = "/" + addTitle() + "offset/" + form.offset.value;
    }else{
        var a = "";
    }
    return a;
}
//URL添加页面名称（未使用）
function addName(){
    var form = document.forms.mainForm;
    if((form.check7.checked == true) && (form.chara.value != "")){
        var a = "/" + addTitle() + "name/" + form.chara.value + "%";
    }else{
        var a = "";
    }
    return a;
}
//URL添加每页显示上限
function addPpage(){
    var form = document.forms.mainForm;
    if((form.check8.checked == true) && (form.page.value != "")){
        var a = "/" + addTitle() + "perPage/" + form.page.value;
    }else{
        var a = "";
    }
    return a;
}
//URL添加显示顺序
function addOrder(){
    var form = document.forms.mainForm;
    if((form.check9.checked == true) && (form.order.value != "")){
        var a = "/" + addTitle() + "order/" + form.order.value;
    }else{
        var a = "";
    }
    return a;
}
//URL添加仅显示父页面
function addParent(){
    var form = document.forms.mainForm;
    if(form.check10.checked == true){
        var a = "/" + addTitle() + "parent/-";
    }else{
        var a = "";
    }
    return a;
}

function addPageno(No){
    if(No < 2){
     var a = "";
    }else{
     var a = "/" + addTitle() + "p/" + No;
    }
    return a;
}

//导出显示项目选项
function addList(){
    var form = document.forms.mainForm;
    var a = "";
    if(form.list1.checked == true){
        a += "/list1_limit/1";
    }
    if(form.list2.checked == false){
        a += "/list2_limit/1";
    }
    if(form.list3.checked == false){
        a += "/list3_limit/1";
    }
    if(form.list4.checked == true){
        a += "/list4_offset/1";
    }
    if(form.list5.checked == true){
        a += "/list5_offset/1";
    }
    if(form.list6.checked == true){
        a += "/list6_offset/1";
    }
    if(form.list7.checked == true){
        a += "/list7_offset/1";
    }
    if(form.list8.checked == false){
        a += "/list8_limit/1";
    }
    if(form.list9.checked == false){
        a += "/list9_limit/1";
    }
    if(form.list10.checked == true){
        a += "/list10_offset/1";
    }
    if(form.list11.checked == true){
        a += "/list11_offset/1";
    }
    if(form.list12.checked == true){
        a += "/list12_offset/1";
    }
    if(form.list14.checked == true){
        a += "/list14_limit/1";
    }
    if(form.list15.checked == true){
        a += "/list15_offset/1";
    }
    return a;
}

//切换到显示SCP文档标题模式
function addTitle(){
    var form = document.forms.mainForm;
    if(form.list13.checked == true){
        var a = "metatitle_";
    }else{
        var a = "";
    }
    return a;
}

//标签列表
function renewTag(){
    var i;
    var s = "<p style='line-height: 1.7;'><input type='checkbox' name='check1' value='true' checked='checked'>标签：";
    for(i = 0; i < tagNumber; i++){
        s += "<a style='padding: 2px 4px; line-height: 1.2; border-radius: 6px; color: white; background-color: ";
        if(tagTable[i][0] == 0){
        s += "green";
        }else if(tagTable[i][0] == 1){
        s += "blue";
        }else if(tagTable[i][0] == 2){
        s += "red";
        }
        s += ";'><span style = 'cursor: pointer; font-size: 1.2em;' onclick = 'deletTag(" + i + ")'>×</span> <span style = 'cursor: pointer;' onclick = 'changeTag(" + i + ")'>" + tagTable[i][1] + "</span></a> ";
    }
    s += "</p>";
    document.getElementById("tagField").innerHTML = s;
}

//点击切换标签检索方式
function changeTag(t){
    tagTable[t][0] = (tagTable[t][0] + 1) % 3;
    renewTag();
}
//点击删除标签
function deletTag(t){
    var i;
    for(i = t; i < tagNumber; i++){
        tagTable[i] = tagTable[i+1];
    }
    if(tagNumber > 0){
        tagNumber = tagNumber - 1;
    }
    renewTag();
}

//直接输入添加标签
function tagInput1(){
    if(form.tagInput.value != ""){
        tagTable[tagNumber] = [1, form.tagInput.value];
        tagNumber = tagNumber + 1;
        renewTag();
    }
    form.tagInput.value = "";
}
//按下回车键添加标签
function onkeydownTagInput(event){
    if(event.keyCode == 13){
     tagInput1();
    }
}
//点击菜单添加标签
function tagInput2(elm){
    if(elm.value != ""){
        tagTable[tagNumber] = [1, elm.value];
        tagNumber = tagNumber + 1;
        renewTag();
    }
}

//根据第1级菜单的类别，生成第2级菜单
function tagCat1(){
    document.getElementById("tagSel3").innerHTML = "";
    var secondSelecter = document.getElementById("tagSel2");
    secondSelecter.innerHTML = "";
    var target = form.tag1.value;
    if(target.length > 0){
        var select = document.createElement("select");
        select.setAttribute("name","tag2");
        select.setAttribute("onChange","registerSearchTagOrCreateThirdSelecter(this)");
        var option = document.createElement("option");
        var isTagSelect = true;
        option.value = "";
        option.innerHTML = "...";
        select.appendChild(option);
        for(var i in FirstCategory[target]){
            option = document.createElement("option");
            option.value = i;
            if(typeof(FirstCategory[target][i]) == "string"){
                option.innerHTML = FirstCategory[target][i];
            }else{
                option.innerHTML = i;
                if(isTagSelect)isTagSelect = false;
            }
            select.appendChild(option);
            if(isTagSelect)select.style = "background-color:#FFFFCC;";
        }
        secondSelecter.appendChild(select);
    }
}

//根据第2级菜单的类别，生成第3级菜单
function registerSearchTagOrCreateThirdSelecter(elm){
    var thirdSelecter = document.getElementById("tagSel3");
    var target = form.tag1.value;
    thirdSelecter.innerHTML = "";
    if(elm.value.length > 0){
        if(typeof(FirstCategory[target][elm.value]) == "string"){
            tagInput2(elm);
        }else{
            var select = document.createElement("select");
            select.setAttribute("onChange","tagInput2(this)");
            select.setAttribute("name","tag3");
            select.setAttribute("style","background-color:#FFFFCC;");
            var option = document.createElement("option");
            option.value = "";
            option.innerHTML = "...";
            select.appendChild(option);
            for(var i in FirstCategory[target][elm.value]){
                option = document.createElement("option");
                option.value = i;
                option.innerHTML = FirstCategory[target][elm.value][i];
                select.appendChild(option);
            }
            thirdSelecter.appendChild(select);
        }
    }
}

//根据创建日期与更新日期筛选
//type=1创建日期　type=2更新日期
function createTimeForm(type){
    var initialCode = (type < 2)?"C":"U";
    var elmName = (type < 2)?"created_at":"updated_at";
    var elm = document.getElementById(elmName);
    var y, m;
    var day = new Date();
    var inputTypeA = "date";
    var inputTypeB = "number";
    var showType = 0;
    showType = Number(getRadioValue(initialCode + "type"));

    if(Browser.indexOf("ie") == 0){
     //兼容IE
     inputTypeA = "text";
     inputTypeB = "text";
    }

    switch(showType){
        case 0:
            y = convDay(day, 1);
            m = convDay(day, 2);
            elm.innerHTML = "<select name='years"+type+"'>" + makeSel(y) + "</select>";
            createTimeSelecter(elm,('month'+type),NotationMonth,true);
            createTimeSelecter(elm,('option'+type),NotationTimeSpan1);
            setPullDown("years" + type,y);
            setPullDown("month" + type,set2fig(m));
        break;
        case 1:
            var specialName = (type < 2)?"created":"updated";
            elm.innerHTML = "<input type='"+inputTypeA+"' name='"+specialName+"'  max='2037-12-31' min=2013-07-01>";
            form.elements[specialName].value = convDay(day, 0);
            form.elements[specialName].max = convDay(day, 0);

        break;
        case 2:
     elm.innerHTML = "<input type='"+inputTypeB+"' name='"+initialCode+"num1' value='1' min='0' />"
     createTimeSelecter(elm,initialCode+'num2',NotationTimeSpan2);
     elm.innerHTML += "<select name='" + initialCode + "daterange'><option value='last%20'>以内</option><option value='older%20than%20'>前 更早</option></select>"
        break;
     default:

     break;

    }
}

function createTimeSelecter(elm,name,List,isMonth){
    var select = document.createElement("select");
    select.setAttribute("name",name);
    var option;
    for(var i in List){
        option = document.createElement("option");
        option.value = (isMonth)?i.split("m").join(""):i;
        option.innerHTML = List[i];
        select.appendChild(option);
    }
    elm.appendChild(select);
}

//生成年份下拉式菜单
function makeSel(year){
    var i = 0;
    var s = "";
    do{
        s += "<option value='" + (year - i) + "'>" +  (year - i) + NotationYear + "</option>";
        i++;
    }while(year - i > 2012)
    return s;
}
//Date变量转换为字符串
function convDay(day, swich){
    var year = day.getFullYear();
    var mon = day.getMonth()+1;
    var day = day.getDate();
    if(swich == 0){
        var s = year + "-" + set2fig(mon) + "-" + set2fig(day);
    }else if(swich == 1){
        var s = year;
    }else if(swich == 2){
        var s = mon;
    }
    return s;
}
//字符串转换为Date变量
function decDay(source){
    var num = source.split("-");
    var day = new Date(num[0], num[1] - 1, num[2], 0, 0, 0);
    return day;
}
//一位数字转换为两位
function set2fig(num) {
    var ret;
    if( num < 10 ) { ret = "0" + num; }
    else { ret = num; }
    return ret;
}

//恢复检索设置状态
function restoreSearchForm(parameter){
    restoreSelectTags(parameter);
    restoreCategory(parameter);
    restoreUserName(parameter);
    restoreRate(parameter);
    restoreVotes(parameter);
    restoreOrder(parameter);
    restorePageSetting(parameter,"perPage/","check8","page");
    restorePageSetting(parameter,"/offset/","check6","offset");
    restorePageSetting(parameter,"metatitle_offset/","check6","offset");
    restoreTimeSetting(parameter,1);
    restoreTimeSetting(parameter,2);
    restoreParentSetting(parameter);
    restoreListSetting(parameter);
}

function restoreSelectTags(parameter){
    var check = parameter.search("tag/");
    if(check < 0)return;
    var tagsMember = extractSpecificParameter(parameter,check,"tag/");
    //解码URL字符串
    tagsMember=decodeURIExtension(tagsMember);
    tagsMember = tagsMember.split(',');
    for(var i=0;i<tagsMember.length;i++){
        choiceTagSetting(tagsMember[i]);
    }
    function choiceTagSetting(target){
        switch(target.charAt(0)){
            case "%":
                target = target.substring(3,target.length);
     if(target != ""){
     tagTable[tagNumber] = [1, target];
     tagNumber++;
     }
            break;
            case "-":
                target = target.substring(1,target.length);
     if(target != ""){
     tagTable[tagNumber] = [2, target];
     tagNumber++;
     }
            break;
            default:
     if(target != ""){
     tagTable[tagNumber] = [0, target];
     tagNumber++;
     }
            break;
        }
        renewTag();
    }
}

function restoreCategory(parameter){
    var check = parameter.search("category/");
    if(check < 0)return;
    var categoryName = extractSpecificParameter(parameter,check,"category/");
    form.check12.checked = true;
    form.category.value = categoryName;
}

function restoreUserName(parameter){
    var check = parameter.search("created_by/");
    if(check < 0)return;
    var userName = extractSpecificParameter(parameter,check,"created_by/");
    form.check4.checked = true;
    form.author.value = userName;
}

function restoreOrder(parameter){
    var check = parameter.search("order/");
    if(check < 0){
        form.check9.checked = false;
        return;
    }
    var targetPara = extractSpecificParameter(parameter,check,"order/");
    form.check9.checked = true;
    setPullDown("order",decodeURIExtension(targetPara));
}

function restoreRate(parameter){
    var check = parameter.search("rating/");
    if(check < 0)return;
    var RateSetting = decodeURIExtension(extractSpecificParameter(parameter,check,"rating/"));
    var i = getParamePositionJustBeforeNumber(RateSetting);
    form.rating2.value = RateSetting.substring(i,RateSetting.length);
    RateSetting = RateSetting.substring(0,i);
    setPullDown("rating1",RateSetting);
    form.check5.checked = true;
}

function restoreVotes(parameter){
    var check = parameter.search("votes/");
    if(check < 0)return;
    var VotesSetting = decodeURIExtension(extractSpecificParameter(parameter,check,"votes/"));
    var i = getParamePositionJustBeforeNumber(VotesSetting);
    form.votes2.value = VotesSetting.substring(i,VotesSetting.length);
    VotesSetting = VotesSetting.substring(0,i);
    setPullDown("votes1",VotesSetting);
    form.check11.checked = true;
}

function restorePageSetting(parameter,target,checkbox,textbox){
    var check = parameter.search(target);
    if(check < 0)return;
    check += target.length;
    var searchNum = "";
    for(var i = check;i < parameter.length;i++){
        if(parameter.charAt(i).match(/[^0-9]/))break;
        searchNum += parameter.charAt(i);
    }
    form.elements[checkbox].checked = true;
    form.elements[textbox].value = searchNum;
}

function restoreParentSetting(parameter){
    if(parameter.search("parent/-") >= 0)form.check10.checked = true;
}

function restoreListSetting(parameter){
    if(parameter.search("list1_limit") >= 0)form.list1.checked = true;
    if(parameter.search("list2_limit") >= 0)form.list2.checked = false;
    if(parameter.search("list3_limit") >= 0)form.list3.checked = false;
    if(parameter.search("list4_offset") >= 0)form.list4.checked = true;
    if(parameter.search("list5_offset") >= 0)form.list5.checked = true;
    if(parameter.search("list6_offset") >= 0)form.list6.checked = true;
    if(parameter.search("list7_offset") >= 0)form.list7.checked = true;
    if(parameter.search("list8_limit") >= 0)form.list8.checked = false;
    if(parameter.search("list9_limit") >= 0)form.list9.checked = false;
    if(parameter.search("list10_offset") >= 0)form.list10.checked = true;
    if(parameter.search("list11_offset") >= 0)form.list11.checked = true;
    if(parameter.search("list12_offset") >= 0)form.list12.checked = true;
    if(parameter.search("metatitle") >= 0){
     form.list13.checked = true;
     document.getElementById("displayList").style.display="none";
    }
    if(parameter.search("list14_limit") >= 0)form.list14.checked = true;
    if(parameter.search("list15_offset") >= 0)form.list15.checked = true;
}

function restoreTimeSetting(parameter,type){
    var targetSentence = (type < 2)?"created_at/":"updated_at/";
    var check = parameter.search(targetSentence);
    if(check < 0)return;
    if(parameter.search(targetSentence + "p/") >= 0)return;
    if(parameter.search(targetSentence + "metatitle_p/") >= 0)return;
    var initialCode = (type < 2)?"C":"U";
    var radioSwitches = form.elements[initialCode + "type"];
    form.elements["check" + (type+1)].checked = true;
    var targetAnalyze = extractSpecificParameter(parameter,check,targetSentence);
    check = targetAnalyze.search("last%20");
    var check1 = targetAnalyze.search("older%20than%20");
    if(check >= 0){
     resotorePeriodSetting("last%20");
    }else if(check1 >= 0){
     resotorePeriodSetting("older%20than%20");
    }else{
    restoreYearAndMonthSetting(targetAnalyze);
    }

    function restoreYearAndMonthSetting(){
        targetAnalyze = decodeURIExtension(targetAnalyze);
        radioSwitches[0].checked = true;
        createTimeForm(type);
        var endPos = getParamePositionJustBeforeNumber(targetAnalyze);
        setPullDown("option" + type,targetAnalyze.substring(0,endPos));
        targetAnalyze = targetAnalyze.substring(endPos,targetAnalyze.length);
        targetAnalyze = targetAnalyze.split(".");
        setPullDown("years" + type,targetAnalyze[0]);
        setPullDown("month" + type,targetAnalyze[1]);
    }

    function resotorePeriodSetting(drange){
        radioSwitches[2].checked = true;
        createTimeForm(type);
        targetAnalyze = targetAnalyze.split(drange).join("");
        for(var i = 0;i < targetAnalyze.length;i++){
            if(targetAnalyze.charAt(i).match(/[^0-9]/))break;
        }
        form.elements[initialCode + "num1"].value = targetAnalyze.substring(0,i);
        setPullDown(initialCode + "num2",targetAnalyze.substring(i,targetAnalyze.length));
    setPullDown(initialCode + "daterange",drange);
    }
}

/*复位辅助*/


function setPullDown(selecter,SelectValue){
    var MenuList = form.elements[selecter].getElementsByTagName('option');

    for(var i = 0;i < MenuList.length;i++){
        if(MenuList[i].value == SelectValue){
            MenuList[i].selected = true;
        }else{
            MenuList[i].selected = false;
        }
    }
}

function decodeURIExtension(target){
/*この関数の
参考:
yukioc氏
JavaScriptでURLをちょっと賢く解読する。 CodingFirst
http://iyukki.blog56.fc2.com/blog-entry-120.html*/
    target=target.replace(/%(?:25)+([0-9A-F][0-9A-F])/g,function(whole,m1){
        return "%"+m1;
    });
    var utf8uri = new RegExp(
        "%[0-7][0-9A-F]|"+
        "%C[2-9A-F]%[89AB][0-9A-F]|%D[0-9A-F]%[89AB][0-9A-F]|"+
        "%E[0-F](?:%[89AB][0-9A-F]){2}|"+
        "%F[0-7](?:%[89AB][0-9A-F]){3}|"+
        "%F[89AB](?:%[89AB][0-9A-F]){4}|"+
        "%F[CD](?:%[89AB][0-9A-F]){5}","ig");
    target=target.replace(utf8uri,function(whole){
        return decodeURI(whole);
    });
    return target;
}

function extractSpecificParameter(parameter,check,target){
    check += target.length;
    for(var i = check;i < parameter.length;i++){
        if(parameter.charAt(i) == "/")break;
        if(parameter.charAt(i) == "#")break;
    }
    return parameter.substring(check,i);
}

function getParamePositionJustBeforeNumber(target){
    for(var i = 0;i < target.length;i++){
        if(target.charAt(i).match(/[0-9]/)){
        break;
        }
        if(target.charAt(i).match("-")){
        break;
        }
    }
    return i;
}

function sendList(){
    if(frameCheck >= 0){
     window.parent.window.frames[frameCheck].resList(listMax, window.parent.window.frames.self.length - 1);
    }
}

function resList2(list){
    var form = document.forms.mainForm;
    form.list1.checked = list[0];
    form.list2.checked = list[1];
    form.list3.checked = list[2];
    form.list4.checked = list[3];
    form.list5.checked = list[4];
    form.list6.checked = list[5];
    form.list7.checked = list[6];
    form.list8.checked = list[7];
    form.list9.checked = list[8];
    form.list10.checked = list[9];
    form.list11.checked = list[10];
    form.list12.checked = list[11];
    form.list13.checked = list[12];
    form.list14.checked = list[13];
    form.list15.checked = list[14];
}

//辅助功能


//读取Radio开关
function getRadioValue(ElmName){
    var result = "";
    if(!isMSBrowser()){
     result = Number(form.elements[ElmName].value);
    }else{
     var radisGroup = form.elements[ElmName];
     for(var i = 0;i < radisGroup.length;i++){
     if(radisGroup[i].checked){
     result = radisGroup[i].value;
     break;
     }
     }
    }
    return result;
}

</script>
<form name='mainForm'>
<center><h2>选择标签</h2></center>
<span id = "tagField"><p><input type='checkbox' name='check1' value='true' checked='checked'>标签：</p></span>
<span id="tagSel1">选择类别：
<select name='tag1' onChange='tagCat1()'>
<option value=''>...</option>
</select></span>
<span id="tagSel2"></span>
<span id="tagSel3"></span>
<p>直接输入：<input type="text" name="tagInput" value="scp" onkeydown="onkeydownTagInput(event);"><input type="button" value="添加标签" onclick="tagInput1()"></p>
<center><h2>显示选项</h2></center>
<table style="margin-right:auto; margin-left:auto; width: 90%; border: 1px solid silver;">
<tr>
<td style="text-align: left; border: 0px">
<p><input type="checkbox" name="check9" value="true" checked='checked'>显示顺序：
<select name="order">
</select></p>
<p><input type="checkbox" name="check8">每页显示上限：<input type="number" name="page" value="20" max="250" min="1"></p>
<p><input type="checkbox" name="check6">偏移值：<input type="number" name="offset" value="0" max="250" min="0"></p>
</td>
</tr>
</table>
<center>
<br/><input type="button" value="开始检索" onclick="startSearch(0, '', 1)">    <input type="button" value="在新标签页打开检索结果" onclick="startSearch(1, '', 1)">
<h2>筛选条件</h2></center>
<table style="margin-right:auto; margin-left:auto; width: 90%; border: 1px solid silver;">
<tr>
<td style="text-align: left; border: 0px">
<p><input type="checkbox" name="check2">创建日期：<input type="radio" name="Ctype" value="0" checked="checked" onChange="createTimeForm(1)">指定年月 <input type="radio" name="Ctype" value="1" onChange="createTimeForm(1)">指定日期 <input type="radio" name="Ctype" value="2" onChange="createTimeForm(1)">指定期间</p>
<span id="created_at"></span>
<p><input type="checkbox" name="check3">更新日期：<input type="radio" name="Utype" value="0" checked="checked" onChange="createTimeForm(2)">指定年月 <input type="radio" name="Utype" value="1" onChange="createTimeForm(2)">指定日期 <input type="radio" name="Utype" value="2" onChange="createTimeForm(2)">指定期间</p>
<span id="updated_at"></span>
<p><input type="checkbox" name="check12">分类：<input type="text" name="category"  value="_default"></p>
<p><input type="checkbox" name="check4">创建者：<input type="text" name="author"  value="user_name"></p>
<p><input type="checkbox" name="check5">评分：<input type="number" name="rating2" value="0" /><select name="rating1" value="="></select></p>
<p><input type="checkbox" name="check11">总票数：<input type="number" name="votes2" value="0" min="0" /><select name="votes1" value="="></select></p>
<!-- <p><input type="checkbox" name="check7">开头文字：<input type="text" name="chara"></p> 因为不稳定而暂未使用 -->
<p><input type="checkbox" name="check10">仅显示父页面</p>
</td>
</tr>
</table>
<span id="displayList">
<center><h2>显示项目</h2></center>
<table style="margin-right:auto; margin-left:auto; width: 90%; border: 1px solid silver;">
<tr>
<td style="text-align: left; border: 0px">
<h3>一般</h3>
<p>创建者<input type="checkbox" name="list2" checked='checked' onChange="sendList()">/
创建日期<input type="checkbox" name="list3" checked='checked' onChange="sendList()">/
讨论<input type="checkbox" name="list8" checked='checked' onChange="sendList()">/
评分<input type="checkbox" name="list9" checked='checked' onChange="sendList()"></p>
<h3>更新・讨论</h3>
<p>最新更新者<input type="checkbox" name="list4" onChange="sendList()">/
最新更新日期<input type="checkbox" name="list5" onChange="sendList()">/
最新讨论者<input type="checkbox" name="list6" onChange="sendList()">/
最新讨论日期<input type="checkbox" name="list7" onChange="sendList()"></p>
<h3>统计数据</h3>
<p>内容长度<input type="checkbox" name="list10" onChange="sendList()">/
子页面<input type="checkbox" name="list11" onChange="sendList()">/
页面版本<input type="checkbox" name="list12" onChange="sendList()">/
评分详细<input type="checkbox" name="list15" onChange="sendList()"></p>
<h3>其他</h3>
<p>项目等级<input type="checkbox" name="list1" onChange="sendList()">/
SCP文档标题<input type="checkbox" name="list13" onChange="sendList()">/
全部标签一览<input type="checkbox" name="list14" onChange="sendList()"></p>
</td>
</tr>
</table>
</span>
<center>
<input type="button" value="开始检索" onclick="startSearch(0, '', 1)">    <input type="button" value="在新标签页打开检索结果" onclick="startSearch(1, '', 1)">
</center>
</form>
[[/html]]
[[/div]]

+ 使用方法

++ 这是什么？

这是一个通过标签来检索网站上的页面的系统。在页面底部的标签列表和标签云的链接中，只能搜索一种类型的标签。但使用此系统，您可以使用AND和OR等条件检索多种标签。此外，您也可以使用创建/更新日期、作者和评分等各种条件进行筛选，还可以设置显示的顺序。您可以自定义显示的项目，还可以显示SCP文档的标题。

如果你想通过SCP文档的标题来搜索，请使用[[[scpmetatitlesearch|标题搜索系统]]]。

++ 设置项目

**选择标签**、**显示选项**、**筛选条件**下每个设置项目之前有复选框，决定是否启用各个功能。在默认情况下，只有**标签**和**显示顺序**有效，您需要单击复选框才能启用其他设置项目。即使选择了下拉式项目或者输入了文本，未启用的功能也会被直接忽略。

++ 选择标签

+++ 输入方法

有两种方法可以选择标签。一个是利用下拉式菜单，选中菜单上的任意类别，将会显示第2级菜单。如果是背景为黄色的选项，选中后相应标签将会被添加到**标签**之后。如果是背景为白色的选项，选中后会显示第3级菜单。这个菜单所有选项都是黄色背景的，选中后相应标签将会被添加到**标签**之后。第2级菜单的分类是由[[*user physicslike]]完成的，如有疏漏敬请谅解。
另外您可以在文本框中直接输入字符串，随后点击**添加标签**按钮或按下回车键即可，注意检查输入的字符串是否与标准标签一致，所有的标签均应以__简体__表示。若待检索的标签暂未录入本系统，您可以使用这种方法输入。

+++ 标签列表

所有输入的标签会显示在标签列表中，每个标签的背景颜色代表不同的检索方式。默认的蓝色表示总是包含此标签（AND），绿色表示可选标签（OR），红色表示不包含此标签（NOT），点击标签即可切换检索方式。例如，如果有绿色的“scp”标签和绿色的“故事”标签，则会检索所有带有“scp”或者“故事”的页面。如果再添加一个蓝色的“全球超自然联盟”标签，则会显示所有带有“全球超自然联盟”的“scp”或者“故事”页面。如果进一步添加一个红色的“人形生物”标签，则会显示所有带有“全球超自然联盟”的“scp”或者“故事”、并排除所有带有“人形生物”标签的页面。
想要删除某个标签，请点击标签左侧的“×”。

++ 显示选项

+++ 显示顺序

您可以从下拉式菜单中选择任意一种排序方式。标题排序仅依照字母和数字顺序，汉语标题则按随机顺序排序。关于内容长度，会计算文中所有字符、语法和空格，因此使用大量语法的页面，尽管实际字数不多，但内容长度的数值会很大。另外，使用子页面迭代的页面仅会计算父页面的语法长度。对于投票数，可以根据总票数（UV和DV的总和）升序或降序排列。

+++ 每页显示上限

每页显示上限决定了每一页内显示的最大项目数，最大值为250。当显示SCP文档标题时，若每页显示数量较多，加载页面会花费较长的时间。

+++ 偏移值

将会隐藏开头指定数量的项目。

++ 筛选条件

+++ 创建日期・更新日期

根据创建和更新日期筛选页面，点击单选按钮选择以下3种筛选方式：
# 指定年月 _
从下拉式菜单中选择年份和月份，然后选择范围：期间、当月及以后、当月及以前、以后、以前。这是指定特定时间段的唯一方法，年份和月份依照世界标准时间（UTC）。
# 指定日期 _
使用日历菜单设定日期，会筛选指定日期及以后创建或更新的页面。该方法会根据您打开此页的时刻计算与设定日期之间的差值，实际上等同于第3种方法，因此可能会错误地计入前一日接近凌晨零时创建或更新的页面。若您的浏览器（如Firefox）不兼容日历菜单，请以“YYYY-MM-DD”的格式手动输入。
# 指定期间 _
设定任意数量的小时、日、周或月，可以选择该时间点至现在或者该时间点更早。

+++ 分类

指定筛选页面的分类，多个分类之间用半角空格隔开，在分类前添加减号（"-category"）以排除特定的分类。

+++ 页面创建者

按照页面创建者的ID筛选，必须输入完整的wikidot用户ID。

+++ 评分

按照页面评分筛选，输入数字后选择范围：相等、不等于、以上或相等、以下或相等、以上、以下。

+++ 总票数

按照UV和DV票数总和筛选，设置方法与评分相同。

+++ 仅显示父页面

仅显示未设置任何父页面的页面。

++ 显示项目

设置各个项目的显示或隐藏。当显示SCP文档标题时，显示项目的设置会显示在检索结果列表下方，项目的显示和隐藏会实时反映在列表中。

+++ 一般

检索结果总是显示序号、标题链接、原文链接（国旗图标）。
默认会显示页面创建者、创建日期、讨论和评分，但可以通过取消勾选来隐藏这些项目。

+++ 统计数据

内容长度会计算文中所有字符、语法和空格，而非实际显示的字数。子页面会显示将该页面作为父页面的页面数量，大多数情况下为0。页面版本指该页面更新的次数。必须先显示评分才能显示评分详细，会显示UV和DV的数量。

+++ 其他

项目等级采用俄语分部的颜色表示法，显示在列表序号和标题之间，并在列表顶端显示图例。
SCP文档标题可以显示SCP系列中心页上的标题。勾选该功能，将使用另一套专用的框架，加载列表会需要花费更长的时间。而且，如前文所述，如果同一页内显示的数量太多，加载速度会非常缓慢。若列表未能正确地显示，可以尝试刷新页面。
全部标签一览可以显示页面的所有标签。您可以点击链接，再次使用该标签作为条件进行检索。该功能仅在显示SCP文档标题的模式下有效。

此页的系统由[[*user physicslike]]和[[*user C-take]]开发，并由[[*user Sekai_s]]翻译，由[[*user Senioriousc]]搬运至  [[span style="font-family: 'Noto Serif SC', 'Noto Serif TC'; font-weight: 900;"]]本站[[/span]] 。如果您发现了任何错误或者有任何意见，请在讨论区留言。
