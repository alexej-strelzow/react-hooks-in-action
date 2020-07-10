import React, {Fragment} from "react";

function Booking ({booking, bookable}) {
  const {title, date, session, notes} = booking;

  return (
    <div className="booking-details-fields">
      <label>Title</label>
      <p>{title}</p>

      <label>Bookable</label>
      <p>{bookable.title}</p>

      <label>Booking Date</label>
      <p>{(new Date(date)).toDateString()}</p>

      <label>Session</label>
      <p>{session}</p>

      {notes && (
        <Fragment>
          <label>Notes</label>
          <p>{notes}</p>
        </Fragment>
      )}
    </div>
  )
}

export default function BookingDetails ({booking, bookable}) {
  return (
    <div className="booking-details">
      <h2>Booking Details</h2>

      {booking ? (
        <Booking
          booking={booking}
          bookable={bookable}
        />
      ) : (
        <div className="booking-details-fields">
          <p>Select a booking or a booking slot.</p>
        </div>
      )}
    </div>
  );
}