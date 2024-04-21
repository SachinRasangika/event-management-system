package net.java.ems.service.impl;

import lombok.AllArgsConstructor;
import net.java.ems.dto.EventDto;
import net.java.ems.entity.Event;
import net.java.ems.exception.ResourceNotFoundException;
import net.java.ems.mapper.EventMapper;
import net.java.ems.repository.EventRepository;
import net.java.ems.service.EventService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class EventServiceImpl implements EventService {

    private EventRepository eventRepository;
    @Override
    public EventDto createEvent(EventDto eventDto) {

        Event event = EventMapper.mapToEvent(eventDto);
        Event savedEvent = eventRepository.save(event);

        return EventMapper.mapToEventDto(savedEvent);
    }

    @Override
    public EventDto getEventById(long Eventid) {
       Event event= eventRepository.findById(Eventid)
                .orElseThrow(() -> new ResourceNotFoundException("Event not exisst with given id:"+ Eventid));
        return EventMapper.mapToEventDto(event);
    }

    @Override
    public List<EventDto> getAllEvents() {
        List<Event> event = eventRepository.findAll();
        return event.stream().map((e)-> EventMapper.mapToEventDto(e))
                .collect(Collectors.toList());
    }

    @Override
    public EventDto updateEvent(long Eventid, EventDto updateEvent) {
        Event event = eventRepository.findById(Eventid).orElseThrow(
                ()-> new ResourceNotFoundException("Event is not exists with given id: "+ Eventid)
        );

        event.setName(updateEvent.getName());
        event.setTime(updateEvent.getTime());
        event.setDate(updateEvent.getDate());
        event.setLocation(updateEvent.getLocation());
        event.setDescription(updateEvent.getDescription());
        Event savedEvent = eventRepository.save(event);

        return EventMapper.mapToEventDto(savedEvent);
    }

    @Override
    public void deleteEvent(long Eventid) {
        Event event = eventRepository.findById(Eventid).orElseThrow(
                ()-> new ResourceNotFoundException("Event is not exists with given id: "+ Eventid)
        );

        eventRepository.deleteById(Eventid);
    }
}
