import React, { useEffect, useState } from 'react';
import { createEvent, getEvent, updateEvent } from '../services/EventService';
import { useNavigate , useParams} from 'react-router-dom';


const EventComponents = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState(null);
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    const{id}= useParams();
    const [errors, setErrors] = useState({
        name: '',
        date: '',
        time: '',
        location: '',
        description: ''
    });

    const navigator = useNavigate();

    useEffect(() => {
        if (id) {
            getEvent(id)
                .then((response) => {
                    const eventData = response.data;
                    setName(eventData.name);
                    setDate(new Date(eventData.date));
                    setTime(eventData.time);
                    setLocation(eventData.location);
                    setDescription(eventData.description);
                })
                .catch((error) => {
                    console.error('Error fetching event:', error);
                });
        }
    }, [id]);

    
    function saveOrUpdateEvent(e) {
        e.preventDefault();

        if (validateForm()) {

            const event = { name, date, time, location, description };
            console.log(event);

            if(id){
                updateEvent(id,event).then((response) =>{
                    console.log(response.data);
                    navigator('/event');
                }).catch(error =>{
                    console.error(error);
                })
            } else{
                createEvent(event).then((response) => {
                    console.log(response.data);
                    navigator('/event');
                }).catch((error) => {
                    console.error('Error creating event:', error);
                   
                })
            }

        }
    }

    function validateForm() {
        let valid = true;

        const errorsCopy = { ...errors };

        // Event name validation
        if (!name.trim()) {
            errorsCopy.name = 'Event name is required';
            valid = false;
        } else {
            errorsCopy.name = '';
        }

        // Date validation
        if (!date) {
            errorsCopy.date = 'Event date is required';
            valid = false;
        } else {
            errorsCopy.date = '';
        }

        // Time validation
        if (!time.trim()) {
            errorsCopy.time = 'Event time is required';
            valid = false;
        } else {
            errorsCopy.time = '';
        }

        // Location validation
        if (!location.trim()) {
            errorsCopy.location = 'Event location is required';
            valid = false;
        } else {
            errorsCopy.location = '';
        }

        // Description validation
        if (!description.trim()) {
            errorsCopy.description = 'Event description is required';
            valid = false;
        } else {
            errorsCopy.description = '';
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Update Event</h2>
        }
        else{
            return <h2 className='text-center'>Add Event</h2>
        }
    }

    return (
        <div className='container'>
            <br/> <br/>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                  {
                    pageTitle()
                  }
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Name</label>
                                <input
                                    type='text'
                                    placeholder='Enter Event Name'
                                    name='name'
                                    value={name}
                                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                {errors.name && <div className='invalid-feedback'> {errors.name}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Date</label>
                                <input
                                    type='date'
                                    placeholder='Enter Event Date'
                                    name='date'
                                    value={date ? date.toISOString().split('T')[0] : ''}
                                    className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                                    onChange={(e) => setDate(new Date(e.target.value))}
                                />
                                {errors.date && <div className='invalid-feedback'> {errors.date}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Time</label>
                                <input
                                    type='time'
                                    placeholder='Enter Event Time'
                                    name='time'
                                    value={time}
                                    className={`form-control ${errors.time ? 'is-invalid' : ''}`}
                                    onChange={(e) => setTime(e.target.value)}
                                />
                                {errors.time && <div className='invalid-feedback'> {errors.time}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Location</label>
                                <input
                                    type='text'
                                    placeholder='Enter Event Location'
                                    name='location'
                                    value={location}
                                    className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                                {errors.location && <div className='invalid-feedback'> {errors.location}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Description</label>
                                <input
                                    type='text'
                                    placeholder='Enter Event Description'
                                    name='description'
                                    value={description}
                                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                {errors.description && <div className='invalid-feedback'> {errors.description}</div>}
                            </div>
                            <button className='btn btn-success' onClick={saveOrUpdateEvent}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventComponents;
