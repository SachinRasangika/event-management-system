import React, { useEffect, useState } from 'react';
import { deleteEvent, listEvents } from '../services/EventService';
import { useNavigate } from 'react-router-dom';

const ListEventComponent = () => {
    const [events, setEvents] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
      getAllEvents();
    }, []);

    function getAllEvents(){
      listEvents()
      .then((response) => {
          setEvents(response.data);
      })
      .catch((error) => {
          console.error(error);
      });
    }

    function addNewEvent() {
        navigator('/add-event');
    }

    function updateEvent(id) {
        navigator(`/edit-event/${id}`);
    }
    function removeEvent(id){
      console.log(id);

      deleteEvent(id).then((response)=>{
        getAllEvents();

      }).catch(error => {
        console.error(error);
      })
    }
    return (
        <div className='container'>
            <h2 className='text-center'>List of Events</h2>
            <button className='btn btn-primary mb-2' onClick={addNewEvent}>
                Add Event
            </button>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Event ID</th>
                        <th>Event Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Location</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <tr key={event.id}>
                            <td>{event.id}</td>
                            <td>{event.name}</td>
                            <td>{event.date}</td>
                            <td>{event.time}</td>
                            <td>{event.location}</td>
                            <td>{event.description}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => updateEvent(event.id)}>
                                    Update
                                </button>
                                <button 
    className='btn btn-danger' 
    onClick={() => removeEvent(event.id)} 
    style={{ marginLeft: '10px' }}>Delete
</button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListEventComponent;
