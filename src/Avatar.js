import React, {useState, useCallback} from 'react';
import PlaceholderAvatar from './components/PlaceholderAvatar/PlaceholderAvatar';

export default function Avatar({avatar, name, addUserType}) {
    const [isErrorLoadImg, setIsErrorLoadImg] = useState(false);

    let initials = name && name.trim().split(' ', 2).map(n => n[0]).join('').toUpperCase();

    const onErrorLoadImg = useCallback(() => {
        setIsErrorLoadImg(true);
    }, [setIsErrorLoadImg]);

    if (avatar && !isErrorLoadImg) {
        return <img class="avatar-image" src={avatar} alt="" onError={onErrorLoadImg} />
    }
    else if (initials) {
        return <div id="user-initials" class="avatar-initials flex-center">
            {initials}
        </div>
    }
    else {
        return <PlaceholderAvatar addUserType={addUserType} />
    }
}