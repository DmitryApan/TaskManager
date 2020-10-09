import React from 'react';
import {Link} from 'react-router-dom';
import HeapAvatars from './components/HeapAvatars/HeapAvatars';
import {connect} from 'react-redux';
import {deleteCard} from './store/actionsCreators/cards';

import './App.css';

class Card extends React.Component {
	handleDelete = (event) => {
		this.props.deleteCard(this.props._id);  

		event.stopPropagation();
	}

	handleModalInfo = (event) => {
		this.props.onModalInfo(this.props._id);

		event.stopPropagation();
	}  

	handleOpenPage = (event) =>  {
		event.stopPropagation();
	}

	render() {
		const {_id, imageSrc, title, description} = this.props;

		return (
			<div onClick={this.handleModalInfo} class="section-card flex-column">
				<div class="flex-row">
					<Link onClick={this.handleOpenPage} class="button-arrow-small" to={_id}>&#187;</Link>          
					<div onClick={this.handleDelete} class="button-x-small">&#xd7;</div>
				</div>
				<div class="section-card-title">{title}</div>
				{imageSrc ? 
					<img 
						class="section-card-image" 
						src={imageSrc} 
						alt=""
					/> : null
				}
				<div class="section-card-info flex-column">
					<div class="section-card-info-text">{description}</div>
					<div class="section-card-info-owners">                
						<HeapAvatars 
							id={_id} 
							size={28}
							mutable={false} 
							maxShowPosition="5" 
						/>	                                                    
					</div>  
				</div>
			</div>
		)
	}    
}

const actionCreator = {
    deleteCard
};

export default connect(null, actionCreator)(Card);