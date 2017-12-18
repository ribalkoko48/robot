import React, {Component} from 'react'
import PhotoCard from '../../../components/PhotoCard'

class Common extends Component {

    state = {
        photos: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19]
    }

    renderTemplates (){
        let timeout = 0
        const list = []

        this.state.photos.forEach((id) => {

            timeout += 50

            list.push(
                <PhotoCard
                    key={id}
                    onClick={() => console.log('клик id')}
                    checked={() => console.log('checkedTempId sssssssdsd')}
                    timeout={timeout}
                />
            )
        })

        return this.state.photos.length === 0 ? (<div className="templates--emptyText">нет фото</div>) : list
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