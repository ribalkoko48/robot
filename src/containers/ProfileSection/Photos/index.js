import React, {Component} from 'react'
import PhotoCard from '../../../components/PhotoCard/index.js'
import {getInstagrammApi} from '../../../getApi/index.js'

class Common extends Component {

    componentWillMount() {
        getInstagrammApi(this.getPhotos)
    }

    state = {
        photos: []
    }

    getPhotos = (data) => {

        this.setState({
            photos: data
        })
    }

    renderTemplates() {
        let timeout = 0
        const list = []

        this.state.photos.forEach((photoObj) => {

            timeout += 50

            list.push(
               
                    <PhotoCard
                        key={photoObj.id}
                        photo={photoObj}
                        timeout={timeout}
                    />
              
            )
        })

        return this.state.photos.length === 0 ? (<div className="templates--emptyText">Загрузка ...</div>) : list
    }


    render() {

        return (
            <div style={{
                display: 'flex',
                flexWrap: 'wrap'
            }}>
                {this.renderTemplates()}
            </div>
        )
    }

}

export default Common