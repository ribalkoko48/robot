import React, {PureComponent} from 'react';
import Photos from './Photos'
import Common from './Common'
import PaperTabs from "../../components/PaperTabs/index";
import './style.scss'

class ProfileSection extends PureComponent {

    state = {
        href: '/common'
    }

    setHref = (value) => {
        this.setState({
            href: value
        })
    }


    render() {
        const {href} = this.state

        return (
            <div className="widget">
                <PaperTabs theme="inWidget"
                           checked={href}
                           onChange={this.setHref}
                />
                <div className="widget--content">
                    {href === '/photos'
                        ? <Photos />
                        : <Common />
                    }</div>
            </div>
        )
    }
}

export default ProfileSection
