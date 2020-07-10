import React, {Fragment, useContext} from "react";
import {FaEdit} from "react-icons/fa";
import UserContext from "../../contexts/UserContext";

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
  // destructure user from context value
  const {user} = useContext(UserContext);
  const isBooker = booking && user && (booking.bookerId === user.id);

  return (
    <div className="booking-details">
      <h2>
        Booking Details
        {isBooker && (
          <span className="controls">
            <button
              className="btn"
            >
              <FaEdit/>
            </button>
          </span>
        )}
      </h2>

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