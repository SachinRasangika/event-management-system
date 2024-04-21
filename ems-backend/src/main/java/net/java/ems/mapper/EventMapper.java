package net.java.ems.mapper;

import net.java.ems.dto.EventDto;
import net.java.ems.entity.Event;

public class EventMapper {

    public static EventDto mapToEventDto(Event event) {
        return new EventDto(
                event.getId(),
                event.getName(),
                event.getDate(),
                event.getTime(),
                event.getLocation(),
                event.getDescription()
        );
    }

    public static Event mapToEvent(EventDto eventDto) {
        return new Event(
                eventDto.getId(),
                eventDto.getName(),
                eventDto.getDate(),
                eventDto.getTime(),
                eventDto.getLocation(),
                eventDto.getDescription()
        );
    }

}
