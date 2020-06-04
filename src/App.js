import React from 'react';

import {ModalCard} from './ModalCard';
import {Section} from './Section';
import {CardAddPanel} from './CardAddPanel';
import {cardCreate, cardDelete, getSettings, getDataCards} from './networkFunctions';

import './App.css';

class App extends React.Component {  
    constructor(props) {
        super(props);        
        this.state = {
            dataCard: {
                statuses: null
            },
            idCard: null
        };  
    }

    async componentDidMount() {
        let dataCardUpdate = {
            statuses: [],
            dataByStatuses: {}
        };

        console.log("App is ready");           
             
        dataCardUpdate.statuses = await getSettings();       
        let cards = await getDataCards();

        cards.forEach((card) => {
            let {status} = {...card}
            let {dataByStatuses} = dataCardUpdate;

            if (!(dataByStatuses[status])) {                
                dataByStatuses[status] = [];
            }                

            dataByStatuses[status].push(card);
        });            

        this.setState({
            dataCard: dataCardUpdate,            
        });        
    }

    handleCreateCard = async(description) => {        
        const {statuses, dataByStatuses} = this.state.dataCard;
        let body = {
            description
        }        
          
        let card = await cardCreate(body);
        
        let {status} = card;        
        let updateDataByStatuses = {
            ...dataByStatuses,
            [status]: [...(dataByStatuses[status] || []), card]
        }       
        
        this.setState({   
            dataCard: {
                dataByStatuses: updateDataByStatuses,
                statuses
            },           
        });               
    }

    handleDeleteCard = async({_id, status}) => {
        const {statuses, dataByStatuses} = this.state.dataCard;

        if (!(await cardDelete(_id))) {
            return;
        }
        
        let arrayCards = dataByStatuses[status].filter(item => item._id !== _id);
        let updateDataByStatuses = {
            ...dataByStatuses,
            [status]: arrayCards
        }
        
        if (!arrayCards.length) {
            delete updateDataByStatuses[status];            
        }
        
        this.setState({       
            dataCard: {
                dataByStatuses: updateDataByStatuses,
                statuses
            },                       
        });
    }

    handleModalInfo = ({_id}) => {
        document.body.style.overflow = 'hidden';
        
        this.setState({            
            idCard: _id
        });        
    }

    handleCloseModal = () => {
        document.body.style.overflow = 'visible';

        this.setState({            
            idCard: null                
        });
    }

    findCardById = (id) => {
        let dataCards = this.state.dataCard.dataByStatuses;
        let card = null;
                
        Object.values(dataCards).find(array => (
            card = array.find(item => item._id === id)             
        ));
        
        return card;
    }

    render() {
        const {statuses, dataByStatuses} = this.state.dataCard;  
        const {idCard} = this.state;      
        
        return (
            <>
                <div>
                    <CardAddPanel onCreateCard={this.handleCreateCard} />

                    <div class = "flex-row">
                        {statuses && statuses.map(status => ( 
                            <Section 
                                status={status} 
                                cards={dataByStatuses[status] || []}
                                onDeleteCard={this.handleDeleteCard}
                                onModalInfo={this.handleModalInfo}
                            />)) }
                    </div>                
                </div> 
                
                {idCard && <ModalCard onCloseModal={this.handleCloseModal} {...this.findCardById(idCard)} />}
            </>   
        );
    }
}

export default App;