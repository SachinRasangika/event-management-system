package net.java.ems.controller;

import lombok.AllArgsConstructor;
import net.java.ems.dto.EventDto;
import net.java.ems.service.EventService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/event")
public class EventController {

    private EventService eventService;

    //build add event rest api
    @PostMapping
    public ResponseEntity<EventDto> createEvent(@RequestBody EventDto eventDto) {
        EventDto savedEventDto = eventService.createEvent(eventDto);
        return new ResponseEntity<>(savedEventDto, HttpStatus.CREATED);
    }

    //build get Event rest api
    @GetMapping("{id}")
    public ResponseEntity<EventDto>getEventById(@PathVariable ("id") Long EventId) {
      EventDto  eventDto = eventService.getEventById(EventId);
      return ResponseEntity.ok(eventDto);
    }
    //build get all events rest api
    @GetMapping
    public ResponseEntity<List<EventDto>> getAllEvents() {
        List<EventDto> events = eventService.getAllEvents();
        return ResponseEntity.ok(events);
    }

    //Build Update Event rest api
    @PutMapping("{id}")
    public ResponseEntity<EventDto>updateEvent(@PathVariable("id") Long EventId,
                                               @RequestBody EventDto updatedEvent) {
        EventDto eventDto = eventService.updateEvent(EventId, updatedEvent);
        return ResponseEntity.ok(eventDto);
    }

    //build delete event rest api
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteEvent(@PathVariable("id") Long EventId) {
        eventService.deleteEvent(EventId);
        return  ResponseEntity.ok("Event deleted");
    }
}
