import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrder } from '../store/slices/orderSlice';
import LoadingSpinner from '../components/common/LoadingSpinner';

const OrderDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentOrder, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrder(id));
  }, [dispatch, id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#ffc107',
      processing: '#17a2b8',
      shipped: '#007bff',
      delivered: '#28a745',
      cancelled: '#dc3545'
    };
    return colors[status] || '#6c757d';
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: 'fas fa-clock',
      processing: 'fas fa-cog',
      shipped: 'fas fa-truck',
      delivered: 'fas fa-check-circle',
      cancelled: 'fas fa-times-circle'
    };
    return icons[status] || 'fas fa-question-circle';
  };

  if (loading) {
    return <LoadingSpinner text="Loading order details..." />;
  }

  if (!currentOrder) {
    return (
      <div style={{ 
        minHeight: 'calc(100vh - 200px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}>
        <i className="fas fa-exclamation-triangle" style={{ fontSize: '4rem', color: '#dc3545', marginBottom: '20px' }}></i>
        <h2>Order Not Found</h2>
        <p style={{ color: '#6c757d', marginBottom: '20px' }}>
          The order you're looking for doesn't exist.
        </p>
        <button onClick={() => navigate('/orders')} className="btn btn-primary">
          <i className="fas fa-arrow-left"></i> Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px 0' }}>
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1>Order #{currentOrder.orderNumber}</h1>
              <p style={{ color: '#6c757d', margin: 0 }}>
                Placed on {new Date(currentOrder.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <div style={{ 
                color: getStatusColor(currentOrder.orderStatus),
                fontWeight: 'bold',
                fontSize: '1.2rem',
                marginBottom: '5px'
              }}>
                <i className={getStatusIcon(currentOrder.orderStatus)} style={{ marginRight: '5px' }}></i>
                {currentOrder.orderStatus.charAt(0).toUpperCase() + currentOrder.orderStatus.slice(1)}
              </div>
              <div style={{ color: '#007bff', fontWeight: 'bold', fontSize: '1.5rem' }}>
                {formatPrice(currentOrder.total)}
              </div>
            </div>
          </div>

          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            {/* Order Items */}
            <div className="card">
              <div className="card-header">
                <h4>Order Items</h4>
              </div>
              <div className="card-body">
                {currentOrder.items.map((item, index) => (
                  <div key={index} className="d-flex align-items-center mb-3" style={{ paddingBottom: '15px', borderBottom: index < currentOrder.items.length - 1 ? '1px solid #eee' : 'none' }}>
                    <div style={{ width: '60px', height: '60px', marginRight: '15px', flexShrink: 0 }}>
                      {item.product.images && item.product.images.length > 0 ? (
                        <img
                          src={item.product.images[0].url}
                          alt={item.product.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '8px'
                          }}
                        />
                      ) : (
                        <div style={{
                          width: '100%',
                          height: '100%',
                          background: '#f8f9fa',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#6c757d'
                        }}>
                          <i className="fas fa-image"></i>
                        </div>
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h5 style={{ margin: 0, marginBottom: '5px' }}>{item.product.name}</h5>
                      <div style={{ color: '#6c757d', fontSize: '0.9rem', marginBottom: '5px' }}>
                        Qty: {item.quantity} × {formatPrice(item.price)}
                      </div>
                      <div style={{ fontWeight: 'bold', color: '#007bff' }}>
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping & Billing */}
            <div>
              {/* Shipping Address */}
              <div className="card mb-3">
                <div className="card-header">
                  <h4><i className="fas fa-truck" style={{ marginRight: '10px' }}></i>Shipping Address</h4>
                </div>
                <div className="card-body">
                  <div style={{ color: '#333' }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                      {currentOrder.shippingAddress.name}
                    </div>
                    <div>{currentOrder.shippingAddress.street}</div>
                    <div>
                      {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state} {currentOrder.shippingAddress.zipCode}
                    </div>
                    <div>{currentOrder.shippingAddress.country}</div>
                    {currentOrder.shippingAddress.phone && (
                      <div style={{ marginTop: '5px', color: '#6c757d' }}>
                        Phone: {currentOrder.shippingAddress.phone}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div className="card">
                <div className="card-header">
                  <h4><i className="fas fa-credit-card" style={{ marginRight: '10px' }}></i>Billing Address</h4>
                </div>
                <div className="card-body">
                  <div style={{ color: '#333' }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                      {currentOrder.billingAddress.name}
                    </div>
                    <div>{currentOrder.billingAddress.street}</div>
                    <div>
                      {currentOrder.billingAddress.city}, {currentOrder.billingAddress.state} {currentOrder.billingAddress.zipCode}
                    </div>
                    <div>{currentOrder.billingAddress.country}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="card mt-4">
            <div className="card-header">
              <h4>Order Summary</h4>
            </div>
            <div className="card-body">
              <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal ({currentOrder.items.length} items):</span>
                  <span>{formatPrice(currentOrder.subtotal)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                  <span>{currentOrder.shipping === 0 ? 'Free' : formatPrice(currentOrder.shipping)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tax:</span>
                  <span>{formatPrice(currentOrder.tax)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                  <span>Total:</span>
                  <span style={{ color: '#007bff' }}>{formatPrice(currentOrder.total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tracking Information */}
          {currentOrder.trackingNumber && (
            <div className="card mt-4">
              <div className="card-header">
                <h4><i className="fas fa-shipping-fast" style={{ marginRight: '10px' }}></i>Tracking Information</h4>
              </div>
              <div className="card-body">
                <div style={{ color: '#333' }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                    Tracking Number: {currentOrder.trackingNumber}
                  </div>
                  <div style={{ color: '#6c757d' }}>
                    You can use this number to track your package on the carrier's website.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Back Button */}
          <div className="text-center mt-4">
            <button onClick={() => navigate('/orders')} className="btn btn-outline">
              <i className="fas fa-arrow-left"></i> Back to Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
