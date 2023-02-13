import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Typography from '@material-ui/core/Typography';
import { TimelineDot } from '@material-ui/lab';
import { Link } from '@material-ui/core';

export default function PastShowsTimeline({ events }) {
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
              <Typography variant="body2">{event.description}</Typography>
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
