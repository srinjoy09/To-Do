import {Store} from 'react-notifications-component';



export const Notification=(props)=> {

    return (

        Store.addNotification({

            title:`${props.title}`,
            message: `${props.message}`,
            type: `${props.type}`,
            insert: "top",
            container: "top-center",
            animationIn: ["animate__animated", "animate__bounce"],
            animationOut: ["animate__animated", "animate__bounce"],
            dismiss: {
                duration: 3000,
                onScreen: true,
                click:true,
                showIcon:true,
            }
        })

    )
}