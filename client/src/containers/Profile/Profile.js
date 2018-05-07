import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import Gravatar from 'react-gravatar';

const styles = {
    display: 'flex',
    flexDirectiopn: 'row',
    cardText: {
        marginRight: '30px'
    },
    cardTitle: {
        marginBottom: '75px'
    }
};

const Profile = ({ profileData }) => (
    <div>
        <Card
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '850px',
                height: '225px',
                margin: '0 auto',
                marginBottom: '50px'
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
                className="cardTitle"
                style={styles.cardTitle}
                title={profileData.fullname}
                subtitle={profileData.bio}
            />
            <div className="profilecard" style={styles}>
                <CardText className="cardText" style={styles.cardText}>
                    <div>{`${profileData.owneditems.length}`} Items Shared</div>
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
    profileData: PropTypes.object.isRequired
};

export default Profile;
