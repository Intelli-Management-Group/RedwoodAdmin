import './MaintenancePage.css';

function MaintenancePage() {
  return (
    <main className="maintenance-page">
      <section className="maintenance-card" aria-labelledby="maintenance-title">
        <p className="maintenance-brand">REDWOOD PEAK</p>
        <div className="maintenance-divider" aria-hidden="true" />
        <h1 id="maintenance-title">Website Under Maintenance</h1>
        <p className="maintenance-message">
          We&apos;re making improvements to our website and will be back soon.
          Thank you for your patience.
        </p>
      </section>
    </main>
  );
}

export default MaintenancePage;
