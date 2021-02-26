import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import HeapAvatars from './components/HeapAvatars/HeapAvatars';
import {deleteCard, deleteCardFromChilds} from './store/actionsCreators/cards';

import './App.css';

class Card extends React.Component {
	handleDelete = (event) => {
		this.props.deleteCardFromChilds(this.props._id);
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
		const {_id, imageSrc, title, description, cards} = this.props;

		return (			
			<div onClick={this.handleModalInfo} className="section-card flex-column">
				<div className="flex-row">
					<Link onClick={this.handleOpenPage} className="button-arrow-small" to={_id}>&#187;</Link>          
					<div onClick={this.handleDelete} className="button-x-small">&#xd7;</div>
				</div>
				<div className="section-card-title">{title}</div>
				{imageSrc ? (
					<img 
						className="section-card-image" 
						src={imageSrc} 
						alt=""
					/>
				 ) : null}
				<div className="section-card-info flex-column">
					<div className="section-card-info-text">{description}</div>
					<div className="section-card-info-owners">                
						<HeapAvatars
							cards={cards} 
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

const mapDispatchToProps = {
	deleteCard,
	deleteCardFromChilds
};

export default connect(null, mapDispatchToProps)(Card);