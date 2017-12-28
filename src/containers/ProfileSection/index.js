import React, {Component} from 'react';
import BreadCrumbs from '../../components/BreadCrumbs'
import Widget from '../../components/Widget'
import {PROFILE_ROUTE, PROFILE_COMMON_SUBROUTE, PROFILE_PHOTOS_SUBROUTE, CIRCULAR_DIAGRAM_SUBROUTE} from '../../constants'

class ProfileSection extends Component {

    getTabs() {

        return [{
            value: PROFILE_COMMON_SUBROUTE,
            label: 'Профиль',
            route: PROFILE_ROUTE + PROFILE_COMMON_SUBROUTE
        }, {
            value: PROFILE_PHOTOS_SUBROUTE,
            label: 'Фото',
            route: PROFILE_ROUTE + PROFILE_PHOTOS_SUBROUTE
        }, {
            value: CIRCULAR_DIAGRAM_SUBROUTE,
            label: 'Круговая диаграмма (аним)',
            route: PROFILE_ROUTE + CIRCULAR_DIAGRAM_SUBROUTE
        }

        ]
    }

    getCrumbs(){
        return [{
            label: "Robot VERA test"
        }]
    }

    render() {
        const {children, router} = this.props
        const selectedTab = router.routes[2].path

        return (
            <div>
                <BreadCrumbs source={this.getCrumbs()} />
                <Widget tabs={this.getTabs()}
                        selectedTab={selectedTab} >
                    {children}
                </Widget>
            </div>
        )
    }
}

export default ProfileSection
