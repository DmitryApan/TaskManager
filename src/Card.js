import React from 'react';
import {Link} from 'react-router-dom';
import HeapAvatars from './components/HeapAvatars/HeapAvatars';

import './App.css';

export default class Card extends React.Component {
	handleDelete = (event) => {
		this.props.onDeleteCard({...this.props});  

		event.stopPropagation();
	}

	handleModalInfo = (event) => {
		this.props.onModalInfo(this.props);

		event.stopPropagation();
	}  

	handleOpenPage = (event) =>  {
		event.stopPropagation();
	}

	render() {
		const {_id, imageSrc, title, description, owners, usersData} = this.props;

		return (
			<div onClick={this.handleModalInfo} class="section-card flex-column">
				<div class="flex-row">
					<Link onClick={this.handleOpenPage} class="button-arrow-small" to={_id}>&#187;</Link>          
					<div onClick={this.handleDelete} class="button-x-small">&#xd7;</div>
				</div>
				<div class="section-card-title">{title}</div>
				{imageSrc ? <img class="section-card-image" src={imageSrc} alt=""></img> : null}
				<div class="section-card-info flex-column">
					<div class="section-card-info-text">{description}</div>
					<div class="section-card-info-owners">                
						<HeapAvatars 
							key={owners}
							mutable={false}
							owners={owners}
							usersData={usersData}
							maxShowPosition="5"
						/>	                                                    
					</div>  
				</div>
			</div>
		)
	}    
}