import React from "react";

interface IProps {
  data: any;
}

const BookingDetails = ({ data }: IProps) => {
  return (
    <div className="overflow-x-auto">
      {/* head */}
      <tbody>
        {/* row 1 */}
        <tr>
          <td>Name</td>
          <td>Contact Number</td>
          <td>Alternative Contact Number</td>
        </tr>
      </tbody>
      <tbody>
        {/* row 1 */}
        <tr>
          <th className="lg:text-base py-0">{data?.user?.name}</th>
          <th className="lg:text-base py-0">{data?.user?.phone}</th>
          <th className="lg:text-base py-0">{data?.alternativeContactNo}</th>
        </tr>
      </tbody>

      {/* head */}
      <tbody>
        {/* row 1 */}
        <tr>
          <td>Email</td>
          <td>Service</td>
          <td>Price</td>
        </tr>
      </tbody>
      <tbody>
        {/* row 1 */}
        <tr>
          <th className="lg:text-base py-0">{data?.user?.email}</th>
          <th className="lg:text-base py-0">{data?.makeoverService?.title}</th>
          <th className="lg:text-base py-0">{data?.makeoverService?.price}</th>
        </tr>
      </tbody>

      {/* head */}
      <tbody>
        {/* row 1 */}
        <tr>
          <td>Date</td>
          <td>Time Slot</td>
          <td>Status</td>
        </tr>
      </tbody>
      <tbody>
        {/* row 1 */}
        <tr>
          <th className="lg:text-base py-0">{data?.date}</th>
          <th className="lg:text-base py-0">
            {data?.startTime} {" - "} {data?.endTime}
          </th>
          <th className="lg:text-base py-0">{data?.status}</th>
        </tr>
      </tbody>
    </div>
  );
};

export default BookingDetails;
