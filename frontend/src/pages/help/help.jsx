import React from 'react'
import './help.css'

function HelpComponent() {
  return (
    <div className='help-section'>
      <h2>Help & Resources</h2>
      <div className='how-it-works'>
        <h3>How does our platform work?</h3>
        <p>
          <strong>Search for properties:</strong> Use the search tool to find
          accommodations in your preferred location and dates. Filters like
          price, property type, and amenities will help refine your search.
        </p>
        <p>
          <strong>Book:</strong> Once you find the perfect accommodation, follow
          the instructions to confirm your booking.
        </p>
        <p>
          <strong>Enjoy your stay:</strong> Communicate with the host to arrange
          your arrival and enjoy your trip.
        </p>
      </div>

      <div className='faq'>
        <h3>Frequently Asked Questions</h3>
        <p>
          <strong>What payment methods do you accept?</strong>
          <br />
          We accept secure payments via credit card, debit card, or digital
          wallet.
        </p>
        <p>
          <strong>What happens if I need to cancel my booking?</strong>
          <br />
          Cancellation policies vary by host. Check the property's policy before
          booking and visit your bookings section to manage changes.
        </p>
        <p>
          <strong>How do I contact a host?</strong>
          <br />
          After booking, you can message the host directly from your account.
        </p>
        <p>
          <strong>What if something goes wrong during my stay?</strong>
          <br />
          We're here to help. You can report any issues from your account, and
          our team will review it.
        </p>
      </div>

      <div className='tips'>
        <h3>Tips for Hosts and Guests</h3>
        <p>
          <strong>Hosts:</strong>
        </p>
        <ul>
          <li>Keep your calendar up to date.</li>
          <li>
            Respond quickly to requests to enhance the guest's experience.
          </li>
          <li>Ensure your space meets basic safety standards.</li>
        </ul>
        <p>
          <strong>Guests:</strong>
        </p>
        <ul>
          <li>Read reviews and descriptions before booking.</li>
          <li>Respect the property's rules.</li>
          <li>Report any issues to the host immediately to resolve them.</li>
        </ul>
      </div>

      <div className='support'>
        <h3>24/7 Support</h3>
        <p>
          Need urgent help? Our team is available 24/7 to address any questions
          or issues you may have.
        </p>
      </div>

      <div className='guides'>
        <h3>Guides & Resources</h3>
        <ul>
          <li>
            <strong>How to find the perfect accommodation:</strong> Learn how to
            use filters and read reviews to choose the ideal place.
          </li>
          <li>
            <strong>Safety tips:</strong> Discover best practices to have a safe
            and hassle-free experience.
          </li>
          <li>
            <strong>Beginner's guide for hosts:</strong> If you're thinking
            about renting your property, find everything you need to get
            started.
          </li>
        </ul>
        <p>
          Still have questions?
          <br />
          Explore our help section from your account to find more specific
          information about your case.
        </p>
      </div>
    </div>
  )
}

export default HelpComponent
