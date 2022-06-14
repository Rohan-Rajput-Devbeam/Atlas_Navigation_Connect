import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ICamlQuery, sp } from '@pnp/sp/presets/all';
import { SPHttpClient, SPHttpClientResponse, SPHttpClientConfiguration } from '@microsoft/sp-http';

export class SPService {
    constructor(private context: WebPartContext) {
        sp.setup({
            spfxContext: this.context
        });

    }
        public async getSitePages(linkID){
            const caml: ICamlQuery = {
                // ViewXml: "<View Scope='RecursiveAll'><ViewFields><FieldRef Name='Title' /><FieldRef Name='FileLeafRef' /></ViewFields></View>",
                // ViewXml: "<View Scope = 'RecursiveAll'></View>",
                ViewXml: "<View Scope='RecursiveAll'><Query><Where><Eq><FieldRef Name='FileLeafRef' /><Value Type='Text'>"+linkID+".aspx</Value></Eq></Where></Query></View>",

                // FolderServerRelativeUrl: `Site%20Pages/${linkID}`
            };

            let listItems = await sp.web.lists.getByTitle("Site Pages").getItemsByCAMLQuery(caml, "FileRef", "FileLeafRef", "ServerRelativeUrl", "Name");
            console.log(listItems)

            // let aa = await sp.web.lists.getByTitle("Site Pages").items.filter("LinkID eq '" + linkID + "'").expand().get();
            // console.log(aa)
            // let bb = await sp.web.lists.getByTitle("Site Pages").items.get();
            // console.log(bb)
            // return aa
            return listItems
        }

        public async getSiteNameAndURL(){
            var siteUrl = this.context.pageContext.web.absoluteUrl ///Get Site Url
            // console.log(siteUrl)
        
            const myArray = siteUrl.split("/");
            let siteName = myArray[myArray.length - 1].split(".")[0]; ///Get Site Name
            // console.log(siteName)

            return [siteUrl , siteName]
        }

    }