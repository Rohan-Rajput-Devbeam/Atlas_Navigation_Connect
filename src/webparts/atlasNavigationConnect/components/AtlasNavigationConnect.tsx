import * as React from 'react';
import styles from './AtlasNavigationConnect.module.scss';
import { IAtlasNavigationConnectProps } from './IAtlasNavigationConnectProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPService } from './SPService/SPService';
import { Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { sp } from '@pnp/sp/presets/all';

export interface IAtlasNavigationConnectState {
	linkArray: any;
	siteName: any;
	siteURL: any;
}

export default class AtlasNavigationConnect extends React.Component<IAtlasNavigationConnectProps, IAtlasNavigationConnectState> {
	public SPService: SPService = null;

	public allLinksArr = []
	public constructor(props: IAtlasNavigationConnectProps) {
		super(props);
		this.SPService = new SPService(this.props.context);
		this.state = {
			linkArray: [],
			siteName: "",
			siteURL: ""
		}
	}

	public async componentDidMount(): Promise<void> {
		const myArray = window.location.href.split("/");
		let brandID = myArray[myArray.length - 1].split(".")[0];
		console.log(brandID)
		// this.getLinkHierarchy("Rack1641385581149");
		this.getLinkHierarchy(brandID);


	}

	public async getLinkHierarchy(linkID) {

		// let allLinks = []
		let response = await this.SPService.getSitePages(linkID);
		let sitePage = await this.SPService.getSiteNameAndURL();
		let siteName = sitePage[1];
		let siteURL = sitePage[0];

		this.setState({
			siteName: siteName,
			siteURL : siteURL
		})

		console.log(response)
		if (response[0].ParentID && response[0].ParentID != "" && response[0].ParentID != null) {
			// allLinks = [...allLinks, ...response[0]]
			console.log(response[0].ParentID)
			this.allLinksArr.push(response[0])
			this.getLinkHierarchy(response[0].ParentID)
		}
		else {
			console.log(response)
			this.allLinksArr.push(response[0])
			console.log(this.allLinksArr)

			this.setState({
				linkArray: this.allLinksArr.reverse()
			})
		}
	}

	public render(): React.ReactElement<IAtlasNavigationConnectProps> {
		return (
			<>
				<Row style={{ borderTop: "4px solid #ededed" }}>
				</Row>
				<Container fluid className={styles.atlasNavigationConnect}
					style={{
						width: "auto",
						marginLeft: "3.5em",
						display: "inline-block",
						borderLeft: "1px solid #ededed",
						borderRight: "1px solid #ededed",
						borderBottom: "1px solid #ededed",
						borderBottomLeftRadius: "0.33em",
						borderBottomRightRadius: "0.33em",
						backgroundColor: "#f2f2f2"
					}}>
					<Row>
						<>
							{this.state.linkArray.map((subItemGroup, i) => (
								<Col md="auto">
									<span style={{
										display: "inline-block",
										color: "#424242",
										fontSize: "1.1em",
										// padding: "1em",
										fontFamily: "Oswald"
									}}>
										<a style={{
											display: "inline-block",
											color: "#424242",
											fontSize: "1.1em",
											// padding: "1em",
											fontFamily: "Oswald"
										}}
											href={`${this.state.siteURL}/SitePages/${subItemGroup.LinkID}.aspx`}>
											{subItemGroup.Title}
										</a>

									</span>
									{i < this.state.linkArray.length - 1 ?
										<span style={{
											display: "inline-block",
											marginLeft: "10px",
											backgroundImage: `url(${this.state.siteURL}/SiteAssets/Logo/Icons/chevright.png)`,
											height: "44px",
											width: "16px",
											color: "transparent",
										}}>
											{'>'}
										</span>
										:
										null}



									{/* <a style={{
                    color: "#424242",
                    fontSize: "1.1em",
                    display: "inline-block",
                    padding: "1em",
                    fontFamily: "Oswald"
            }}
            href={`https://devbeam.sharepoint.com/sites/ModernConnect/SitePages/${subItemGroup.LinkID}.aspx`}>
                {subItemGroup.Title}
            </a> */}
									{/* <span style={{
                   backgroundImage: "url(/_catalogs/masterpage/resources/img/chevright.png)",
                   height: "44px",
                   width: "16px",
                   color: "transparent",
                   position: "relative",
                   top: "-1.25em",
                   display: "inline-block",
                   marginBottom: "-1.25em",
                   marginLeft: "-19px",
                
                   clear: "both",
                //    display: "block",
                   marginRight: "1.6em",
                   borderTop: "0px solid #ededed"
            }}></span> */}
								</Col>
							))}
						</>
					</Row>
				</Container></>

		);
	}
}
