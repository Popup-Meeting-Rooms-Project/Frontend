import Content from './Content'
import '../css/App.css'

export default function Main() {
    return (
        <div class="all">
            <div class="main">
                <h3 class="label">Room</h3>
                <h3 class="label">Floor</h3>
                <h3 class="label">Temperature</h3>
                <h3 class="label">CO2 Level</h3>
                <h3 class="label">Status</h3>
                <h3 class="label" id="map">Map</h3>
            </div>

            <div class="content" >
                <Content />
            </div>
        </div>
    )
}