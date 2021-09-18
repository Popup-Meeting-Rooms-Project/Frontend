import Content from './Content'
import '../css/App.css'

export default function Main() {
    return (
        <div class="all">
            <div class="main">
                <h3 class="roomLabel">Room</h3>
                <h3 class="floorLabel">Floor</h3>
                <h3 class="temperatureLabel">Temperature</h3>
                <h3 class="co2Label">CO2 Level</h3>
                <h3 class="statusLabel">Status</h3>
                <h3 class="mapLabel" id="map">Map</h3>
            </div>

            <div class="content" >
                <Content />
            </div>
        </div>
    )
}