json.bookings do
  json.array! @bookings do |booking|
    json.id booking.id
    json.start_date booking.start_date
    json.end_date booking.end_date
    json.property_id booking.property.id
    json.property_title booking.property.title
    json.property_image booking.property.image_url
    json.is_paid booking.is_paid
    json.charges booking.charges
  end
end