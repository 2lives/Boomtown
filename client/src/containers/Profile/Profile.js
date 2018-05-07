import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import Gravatar from 'react-gravatar';

const styles = {
    display: 'flex',
    flexDirectiopn: 'row'
};

const Profile = ({ profileData }) => (
    <div>
        <Card
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto',
                marginBottom: '50px',
                width: '850px',
                height: '225px'
            }}
            containerStyle={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                width: '100%'
            }}
        >
            <CardTitle
                title={profileData.fullname}
                subtitle={profileData.bio}
            />
            <div className="profilecard" style={styles}>
                <CardText>
                    <div>{`${profileData.owneditems.length} Items Shared`}</div>
                    <div>{`${
                        profileData.borroweditems.length
                    } Items borrowed`}</div>
                </CardText>
                <Gravatar
                    email={profileData.email}
                    style={{
                        borderRadius: '50%'
                    }}
                    size={175}
                />
            </div>
        </Card>
    </div>
);

Profile.propTypes = {
    //     currentUser: PropTypes.object.isRequired,
    //     items: PropTypes.array.isRequired,
    //     borrowed: PropTypes.array.isRequired
};

export default Profile;
