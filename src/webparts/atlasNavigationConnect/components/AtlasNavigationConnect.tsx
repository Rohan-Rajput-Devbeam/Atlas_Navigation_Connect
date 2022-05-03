import * as React from 'react';
import styles from './AtlasNavigationConnect.module.scss';
import { IAtlasNavigationConnectProps } from './IAtlasNavigationConnectProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPService } from './SPService/SPService';
import { Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

export interface IAtlasNavigationConnectState {
	linkArray: any;
}

export default class AtlasNavigationConnect extends React.Component<IAtlasNavigationConnectProps, IAtlasNavigationConnectState> {
	public SPService: SPService = null;

	public allLinksArr = []
	public constructor(props: IAtlasNavigationConnectProps) {
		super(props);
		this.SPService = new SPService(this.props.context);
		this.state = {
			linkArray: []
		}
	}

	public componentDidMount() {
		this.getLinkHierarchy("Rack1641385581149")
	}

	public async getLinkHierarchy(linkID) {
		// let allLinks = []
		let response = await this.SPService.getSitePages(linkID);
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
			<Container>
				<Row>
					<>
						{this.state.linkArray.map((subItemGroup, i) => (
							<Col>
								<p>
									{subItemGroup.Title + '\>\>'} 
								</p>
							</Col>
						))}
					</>
				</Row>
			</Container>

		);
	}
}
