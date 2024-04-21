package net.java.ems.service;

import net.java.ems.dto.EventDto;

import java.util.List;

public interface EventService {
    EventDto createEvent(EventDto eventDto);

    EventDto getEventById(long Eventid);

    List<EventDto> getAllEvents();

    EventDto updateEvent(long Eventid, EventDto updateEvent);

    void deleteEvent(long Eventid);
}
