import { useEffect, useState } from 'react';



export default function Map({Data}) {

    const [floor1amount, setFloor1amount] = useState(0);
    const [floor2amount, setFloor2amount] = useState(0);
    const [floor3amount, setFloor3amount] = useState(0);
    const [floor4amount, setFloor4amount] = useState(0);

    useEffect(() => {
        
        Data.forEach(post =>
            updateRooms(post.floor, post.status)
        )
        
    }, [Data])
    var i = 0;
    const updateRooms = (floor, status) => {
        i++
        console.log("Times run: " + i)
        
        console.log("floor: " + floor + " status: " + status)
        
        if (floor === 1) {
            
            console.log("floor amount 1: " + floor)
            if (status === true) {
                setFloor1amount(floor1amount + 1);
                
        
            }
        }
        if (floor === 2) {
            
            if (status === true) {
                setFloor2amount(floor2amount + 1);
                
             }
        }
        if (floor === 3) {
            if (status === true) {
                setFloor3amount(floor3amount + 1);
                
             }
        }
        if (floor === 4) {
            if (status === true) {
                setFloor4amount(floor4amount + 1);
            
             }
        }
    }

    


    const changeColor1 = (amount) => {
        console.log("testdata 1 :" + amount)
        if (amount === 0) {
           return <p id="floor1boxRed">{amount} available rooms</p>
        } else {
            return <p id="floor1boxGreen">{amount} available rooms</p>
        }
    }

    const changeColor2 = (amount) => {
        if (amount === 0) {
            return <p id="floor2boxRed">{amount} available rooms</p>
         } else {
             return <p id="floor2boxGreen">{amount} available rooms</p>
         }
    }

    const changeColor3 = (amount) => {
        if (amount === 0) {
            return <p id="floor3boxRed">{amount} available rooms</p>
         } else {
             return <p id="floor3boxGreen">{amount} available rooms</p>
         }
    }

    const changeColor4 = (amount) => {
        if (amount === 0) {
            return <p id="floor4boxRed">{amount} available rooms</p>
         } else {
             return <p id="floor4boxGreen">{amount} available rooms</p>
         }
    }

    return (
        <div id="map">
            <div className="floorLabel">{changeColor4(floor4amount)}4th floor</div>
            <div className="floorLabel">{changeColor3(floor3amount)}3rd floor</div>
            <div className="floorLabel">{changeColor2(floor2amount)}2nd floor</div>
            <div className="floorLabel">{changeColor1(floor1amount)}1st floor</div>
        </div>
    )

}
