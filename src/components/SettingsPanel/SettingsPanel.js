import React, {useCallback, useState} from 'react';
import {Switch, Button, Input, message} from 'antd';

import {getRandomColor, getExistStatus} from '../../appFunctions';

import styles from './SettingsPanel.less';

export default function SettingsPanel({statuses, onDeleteStatus, onCreateStatus, onEnabledStatus}) {

    const [statusName, setStatusName] = useState('');

    const handleDeleteStatus = useCallback(name => () => {
        onDeleteStatus(name);
    }, [onDeleteStatus]);

    const handleEnabledStatus = useCallback(name => (value) => {
        onEnabledStatus(name, value);
    }, [onEnabledStatus]);

    const handleCreateStatus = useCallback(() => {        
        if (getExistStatus(statusName, statuses) || statusName === 'Other') {
            message.error(`Unable to add status! The ${statusName} status already exists.`);
        } else {
            onCreateStatus({
                name: statusName,
                color: getRandomColor(),
                enabled: true
            });  
            
            setStatusName('');            
        }       
    }, [getExistStatus, statusName, statuses, onCreateStatus, getRandomColor, setStatusName, message]);

    const handleChangeStatusName = useCallback(({target}) => {        
        setStatusName(target.value);
    }, [setStatusName]);

    return (
        <div className={styles.container}>
            {statuses.map((status, index) => (
                <div key={index} className={styles.row}>
                    <div className={styles.statusText} >
                        <text>{status.name}</text>
                    </div>
                    <div className={styles.switchButton}>
                        <Switch 
                            size="small" 
                            checked={status.enabled} 
                            onChange={handleEnabledStatus(status.name)}
                        />
                    </div>
                    <div className={styles.deleteButton}>
                        <Button 
                            size="small" 
                            type="link" 
                            onClick={handleDeleteStatus(status.name)}
                            danger
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            ))}            
            <div className={styles.row}>
                <div className={styles.statusInput}>
                    <Input 
                        onChange={handleChangeStatusName} 
                        size="small" 
                        value={statusName}
                        danger                        
                    />
                </div>    
                <div className={styles.addButton}>
                    <Button 
                        size="small" 
                        type='primary'
                        onClick={handleCreateStatus}
                    >
                        Add Status
                    </Button>
                </div>            
            </div>
        </div>
    )
}