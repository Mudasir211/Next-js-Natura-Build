// lib/emailTemplates.js

// --- USER: Order Placed ---
export function orderPlacedTemplate(order) {
  const itemsList = order.items
    .map(
      (item) => `
      <div style="border:1px solid #e5e5e5;border-radius:8px;padding:16px;margin-bottom:12px;background:#fafafa;">
        <div style="display:flex;align-items:flex-start;gap:12px;">
          <img src="${item.image}" alt="${item.name}" 
               style="width:50px;height:50px;object-fit:cover;border-radius:6px;flex-shrink:0;margin-right:10px;">
          <div style="flex:1;">
            <h4 style="margin:0 0 8px 0;color:#333;font-size:15px;line-height:1.3;">${
              item.name
            }</h4>
            <div style="display:flex;justify-content:space-between;font-size:14px;color:#666;">
              <span><b> Quantity: </b> ${item.qty} </span>
              <span><b> Price: </b> Rs.${item.price} </span>
              <span><b> Subtotal: </b> Rs.${item.qty * item.price} </span>
            </div>
          </div>
        </div>
      </div>
    `
    )
    .join("");

  return `
  <div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;background:#ffffff;border:1px solid #e5e5e5;border-radius:8px;overflow:hidden;">
    <!-- Header -->
    <div style="padding:20px;text-align:center;background:#ffffff;">
      <img src="https://res.cloudinary.com/dokusdeg3/image/upload/v1758715263/logo_zj8pjv.png" alt="Natura Logo" style="max-height:70px;margin-bottom:10px;">
      <h1 style="color:#1b5e20;margin:0;">Thank You for Your Order!</h1>
    </div>

    <!-- Body -->
    <div style="padding:20px;">
      <p style="font-size:16px;color:#333;">Hello <b>${
        order.shippingAddress.fullName
      }</b>,</p>
      <p style="font-size:15px;color:#555;">
        We're happy to confirm your order <b style="color:#1b5e20;">#${
          order._id
        }</b> has been placed on 
        <b>${new Date(order.placedAt).toLocaleString()}</b>.
      </p>

      <!-- Order summary -->
      <h3 style="color:#1b5e20;margin-bottom:15px;padding-bottom:8px;border-bottom:2px solid #1b5e20;">Order Summary</h3>
      ${itemsList}

      <!-- Totals -->
      <div style="background:#f8f9fa;padding:16px;border-radius:6px;margin:20px 0;">
        <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
          <span style="font-weight:bold;color:#333;">Items Total: </span>
          <span style="color:#333;"> Rs.${order.itemsPrice}</span>
        </div>
        <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
          <span style="font-weight:bold;color:#333;">Shipping: </span>
          <span style="color:#333;"> Rs.${order.shippingPrice}</span>
        </div>
        <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
          <span style="font-weight:bold;color:#333;">Tax: </span>
          <span style="color:#333;"> Rs.${order.taxPrice}</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:18px;padding-top:8px;border-top:1px solid #ddd;">
          <span style="font-weight:bold;color:#1b5e20;">Total Amount: </span>
          <span style="font-weight:bold;color:#1b5e20;"> Rs.${
            order.totalPrice
          }</span>
        </div>
      </div>

      <!-- Shipping Info -->
      <div style="background:#f8f9fa;padding:16px;border-radius:6px;margin:20px 0;">
        <h3 style="color:#1b5e20;margin-top:0;margin-bottom:12px;">Shipping Information</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:14px;">
          <div><b>Name: </b> ${order.shippingAddress.fullName}</div>
          <div><b>Email: </b> ${order.shippingAddress.email}</div>
          <div><b>Phone: </b> ${order.shippingAddress.phone}</div>
          <div><b>Address: </b> ${order.shippingAddress.address}</div>
          <div><b>House: </b> ${order.shippingAddress.house}</div>

          <div><b>Street: </b> ${order.shippingAddress.street}</div>
          <div><b>City: </b> ${order.shippingAddress.city}</div>
          <div><b>State: </b> ${order.shippingAddress.state}</div>
          <div><b>Postal Code: </b> ${order.shippingAddress.postalCode}</div>
          <div><b>Country: </b> ${order.shippingAddress.country}</div>
        </div>
      </div>

      <!-- Payment Info -->
      <div style="background:#f8f9fa;padding:16px;border-radius:6px;margin:20px 0;">
        <h3 style="color:#1b5e20;margin-top:0;margin-bottom:8px;">Payment Method</h3>
        <p style="margin:0;font-size:15px;color:#333;">${
          order.paymentMethod
        }</p>
      </div>

      <!-- Footer -->
      <div style="margin-top:30px;padding-top:15px;border-top:1px solid #ddd;text-align:center;color:#777;font-size:12px;">
        <p>Thank you for choosing <b style="color:#1b5e20;">Natura</b>. 🌿<br>
        If you have any questions, contact us at 
        <a href="mailto:${process.env.ADMIN_EMAIL}" style="color:#1b5e20;">${
    process.env.ADMIN_EMAIL
  }</a></p>
      </div>
    </div>
  </div>`;
}

// --- USER: Status Update ---
export function statusUpdateTemplate(order, status) {
  const placedAt = new Date(order.placedAt).toLocaleString("en-PK", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const itemsList = order.items
    .map(
      (item) => `
      <div style="border:1px solid #e5e5e5;border-radius:8px;padding:16px;margin-bottom:12px;background:#fafafa;">
        <div style="display:flex;align-items:flex-start;gap:12px;">
          <img src="${item.image}" alt="${item.name}" 
               style="width:50px;height:50px;object-fit:cover;border-radius:6px;flex-shrink:0;margin-right:10px;">
          <div style="flex:1;">
            <h4 style="margin:0 0 8px 0;color:#333;font-size:15px;line-height:1.3;">${
              item.name
            }</h4>
            <div style="display:flex;justify-content:space-between;font-size:14px;color:#666;">
              <span><b>Quantity: </b> ${item.qty}</span>
              <span><b>Price: </b> Rs.${item.price}</span>
              <span><b>Subtotal: </b> Rs.${item.qty * item.price}</span>
            </div>
          </div>
        </div>
      </div>
    `
    )
    .join("");

  return `
  <div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;background:#ffffff;border:1px solid #e5e5e5;border-radius:8px;overflow:hidden;">
    <!-- Header -->
    <div style="padding:20px;text-align:center;background:#ffffff;">
      <img src="https://res.cloudinary.com/dokusdeg3/image/upload/v1758715263/logo_zj8pjv.png" 
        alt="Natura Logo" style="max-height:70px;margin-bottom:10px;">
      <h1 style="color:#1b5e20;margin:0;">Order Status Update</h1>
    </div>

    <!-- Body -->
    <div style="padding:20px;">
      <p style="font-size:16px;color:#333;">Hello <b>${order.shippingAddress.fullName}</b>,</p>
      <p style="font-size:15px;color:#555;">
        Your order <b style="color:#1b5e20;">#${order._id}</b> status has been updated.
      </p>
      
      <!-- Status Highlight -->
      <div style="background:#e8f5e8;padding:16px;border-radius:8px;text-align:center;margin:20px 0;border-left:4px solid #1b5e20;">
        <h2 style="color:#1b5e20;margin:0;">${status}</h2>
      </div>

      <p style="font-size:14px;color:#555;margin-bottom:20px;">
        <b>Placed At:</b> ${placedAt}
      </p>

      <!-- Order summary -->
      <h3 style="color:#1b5e20;margin-bottom:15px;padding-bottom:8px;border-bottom:2px solid #1b5e20;">Order Summary</h3>
      ${itemsList}

      <!-- Totals -->
      <div style="background:#f8f9fa;padding:16px;border-radius:6px;margin:20px 0;">
        <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
          <span style="font-weight:bold;color:#333;">Items Total: </span>
          <span style="color:#333;">Rs.${order.itemsPrice}</span>
        </div>
        <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
          <span style="font-weight:bold;color:#333;">Shipping: </span>
          <span style="color:#333;">Rs.${order.shippingPrice}</span>
        </div>
        <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
          <span style="font-weight:bold;color:#333;">Tax: </span>
          <span style="color:#333;">Rs.${order.taxPrice}</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:18px;padding-top:8px;border-top:1px solid #ddd;">
          <span style="font-weight:bold;color:#1b5e20;">Total Amount:</span>
          <span style="font-weight:bold;color:#1b5e20;">Rs. ${order.totalPrice}</span>
        </div>
        <div style="margin-top:12px;padding-top:8px;border-top:1px solid #ddd;">
          <b>Payment Method:</b> ${order.paymentMethod}
        </div>
      </div>

      <!-- Shipping Info -->
      <div style="background:#f8f9fa;padding:16px;border-radius:6px;margin:20px 0;">
        <h3 style="color:#1b5e20;margin-top:0;margin-bottom:12px;">Shipping Information</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:14px;">
          <div><b>Name: </b> ${order.shippingAddress.fullName}</div>
          <div><b>Email: </b> ${order.shippingAddress.email}</div>
          <div><b>Phone: </b> ${order.shippingAddress.phone}</div>
           <div><b>Address: </b> ${order.shippingAddress.address}</div>
          <div><b>House: </b> ${order.shippingAddress.house}</div>
          <div><b>Street: </b> ${order.shippingAddress.street}</div>
          <div><b>City: </b> ${order.shippingAddress.city}</div>
          <div><b>State: </b> ${order.shippingAddress.state}</div>
          <div><b>Postal Code: </b> ${order.shippingAddress.postalCode}</div>
          <div><b>Country: </b> ${order.shippingAddress.country}</div>
        </div>
      </div>

      <!-- Footer -->
      <div style="margin-top:30px;padding-top:15px;border-top:1px solid #ddd;text-align:center;color:#777;font-size:12px;">
        <p>Thank you for shopping with <b style="color:#1b5e20;">Natura</b>. 🌿<br>
        If you have any questions, contact us at 
        <a href="mailto:${process.env.ADMIN_EMAIL}" style="color:#1b5e20;">${process.env.ADMIN_EMAIL}</a></p>
      </div>
    </div>
  </div>`;
}

// --- ADMIN: New Order Notification ---
export function adminOrderNotificationTemplate(order) {
  const itemsList = order.items
    .map(
      (item) => `
      <div style="border:1px solid #e5e5e5;border-radius:6px;padding:12px;margin-bottom:8px;background:#fafafa;">
        <div style="display:flex;align-items:flex-start;gap:10px;">
          <img src="${item.image}" alt="${item.name}" 
               style="width:50px;height:50px;object-fit:cover;border-radius:4px;flex-shrink:0;margin-right:10px;">
          <div style="flex:1;">
            <h4 style="margin:0 0 6px 0;color:#333;font-size:14px;line-height:1.3;">${
              item.name
            }</h4>
            <div style="display:flex;justify-content:space-between;font-size:13px;color:#666;">
              <span><b>Qty: </b> ${item.qty}</span>
              <span><b>Price: </b> Rs.${item.price}</span>
              <span><b>Subtotal: </b> Rs.${item.qty * item.price}</span>
            </div>
          </div>
        </div>
      </div>
    `
    )
    .join("");

  return `
  <div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;background:#ffffff;border:1px solid #e5e5e5;border-radius:8px;overflow:hidden;">
    <!-- Header -->
    <div style="padding:20px;text-align:center;background:#ffffff;">
      <img src="https://res.cloudinary.com/dokusdeg3/image/upload/v1758715263/logo_zj8pjv.png" alt="Natura Logo" style="max-height:70px;margin-bottom:10px;">
      <h1 style="color:#1b5e20;margin:0;">New Order Received</h1>
    </div>

    <!-- Body -->
    <div style="padding:20px;">
      <div style="background:#fff3cd;padding:12px;border-radius:6px;border-left:4px solid #ffc107;margin-bottom:20px;">
        <p style="margin:0;font-size:15px;color:#856404;font-weight:bold;">🚨 New order requires your attention!</p>
      </div>

      <div style="background:#f8f9fa;padding:16px;border-radius:6px;margin-bottom:20px;">
        <h3 style="color:#1b5e20;margin-top:0;">Order Details</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:14px;">
          <div><b>Order ID:</b> #${order._id}</div>
          <div><b>Placed At:</b> ${new Date(
            order.placedAt
          ).toLocaleString()}</div>
          <div><b>Payment Method: </b> ${order.paymentMethod}</div>
          <div><b>Total Amount: </b> Rs.${order.totalPrice}</div>
        </div>
      </div>

      <!-- Customer Info -->
      <div style="background:#f8f9fa;padding:16px;border-radius:6px;margin-bottom:20px;">
        <h3 style="color:#1b5e20;margin-top:0;margin-bottom:12px;">Customer Information</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:14px;">
          <div><b>Name:</b> ${order.shippingAddress.fullName}</div>
          <div><b>Email: </b> ${order.shippingAddress.email}</div>
          <div><b>Phone: </b> ${order.shippingAddress.phone}</div>
           <div><b>Address: </b> ${order.shippingAddress.address}</div>
          <div><b>House: </b> ${order.shippingAddress.house}</div>
          <div><b>Street: </b> ${order.shippingAddress.street}</div>
          <div><b>City: </b> ${order.shippingAddress.city}</div>
          <div><b>State: </b> ${order.shippingAddress.state}</div>
          <div><b>Postal Code: </b> ${order.shippingAddress.postalCode}</div>
          <div><b>Country: </b> ${order.shippingAddress.country}</div>
        </div>
      </div>

      <!-- Order summary -->
      <h3 style="color:#1b5e20;margin-bottom:12px;padding-bottom:6px;border-bottom:2px solid #1b5e20;">Order Items</h3>
      ${itemsList}

      <!-- Totals -->
      <div style="background:#e8f5e8;padding:16px;border-radius:6px;margin:20px 0;">
        <div style="display:flex;justify-content:space-between;margin-bottom:6px;font-size:15px;">
          <span style="font-weight:bold;color:#333;">Items Total: </span>
          <span style="color:#333;">Rs.${order.itemsPrice}</span>
        </div>
        <div style="display:flex;justify-content:space-between;margin-bottom:6px;font-size:15px;">
          <span style="font-weight:bold;color:#333;">Shipping: </span>
          <span style="color:#333;">Rs.${order.shippingPrice}</span>
        </div>
        <div style="display:flex;justify-content:space-between;margin-bottom:6px;font-size:15px;">
          <span style="font-weight:bold;color:#333;">Tax: </span>
          <span style="color:#333;">Rs.${order.taxPrice}</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:18px;padding-top:8px;border-top:2px solid #1b5e20;">
          <span style="font-weight:bold;color:#1b5e20;">Grand Total: </span>
          <span style="font-weight:bold;color:#1b5e20;">Rs.${
            order.totalPrice
          }</span>
        </div>
      </div>
    </div>
  </div>`;
}
