import React, {useCallback, useState} from 'react';
import {Switch, Button, Input} from 'antd';

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
        onCreateStatus({
            name: statusName,
            color: '#' + (Math.random().toString(16) + '000000').substring(2,8).toUpperCase(),
            enabled: true
        });  
        
        setStatusName('');
    }, [onCreateStatus, statusName, setStatusName]);

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