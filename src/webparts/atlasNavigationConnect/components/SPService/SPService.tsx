import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp } from '@pnp/sp/presets/all';
import { SPHttpClient, SPHttpClientResponse, SPHttpClientConfiguration } from '@microsoft/sp-http';

export class SPService {
    constructor(private context: WebPartContext) {
        sp.setup({
            spfxContext: this.context
        });
    }
        public async getSitePages(linkID){
            let aa = await sp.web.lists.getByTitle("Site Pages").items.filter("LinkID eq '" + linkID + "'").expand().get();
            console.log(aa)
            return aa
        }

    }