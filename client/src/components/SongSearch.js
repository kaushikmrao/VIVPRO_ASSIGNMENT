import { useMemo, useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css';
import { Button, InputGroup, FormControl } from 'react-bootstrap'

function SingleRow({data}) {
    // data.map((col) =>> {
    //     <td>{}</td>
    // })
}

function SongSearch() {
    const [input, setInput] = useState('')
    const [song, setSong] = useState({})
    const [showData, setShowData] = useState(false)
    const getSong = () => {
        axios({
            method: "get",
            data: {
            name: input
            },
            url: `http://127.0.0.1:5000/api/GetSong/${input}`
        }).then( res => {
            setSong(res.data);
            setShowData(true);
        }).catch( err => {
            setShowData(false);
        })
    }

    return (
        <div className="search">
            <InputGroup size="sm">
                <FormControl
                    placeholder="Song Name"
                    aria-label="Song Name"
                    aria-describedby="basic-addon1"
                    onChange={e => setInput(e.target.value)}
                />
                <Button variant="primary" size="sm" id="button-addon1" onClick={getSong}>Get Song</Button> 
            </InputGroup>
            {
                showData && 
                <div className="output">
                    <b>Result:</b>
                    <pre>
                        {JSON.stringify(song, null, 2)}
                    </pre>
                </div>
            }
        </div>
    )
}

export default SongSearch