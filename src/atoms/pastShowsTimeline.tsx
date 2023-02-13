import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@mui/lab';
import { Link, Typography } from '@mui/material';
import React from 'react';
import { Event } from '@/ions/event';

interface PastShowsTimelineProps {
  events: Event[];
}

export default function PastShowsTimeline({ events }: PastShowsTimelineProps) {
  return (
    <>
      <Typography variant="h3" component="h2" gutterBottom>
        Past Shows
      </Typography>

      <Timeline>
        {events.map((event, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent>
              <Link
                href={event.url}
                variant="h6"
                target="_blank"
                rel="noopener"
              >
                {event.title}
              </Link>
              <Typography variant="body2">{event.type}</Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="body2" color="textSecondary">
                {event.date}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </>
  );
}
