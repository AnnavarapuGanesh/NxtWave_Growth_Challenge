export function exportRegistrationsToCsv(registrations, filename = 'nxtwave_workshop_registrations.csv') {
  if (!registrations || registrations.length === 0) {
    alert('No registrations available to export.');
    return;
  }

  const headers = [
    'ID',
    'Name',
    'Email',
    'WhatsApp',
    'College',
    'Branch',
    'Graduation Year',
    'Referral Code',
    'Referred By',
    'Referral Count',
    'UTM Source',
    'Registration Timestamp',
    'Type'
  ];

  const escapeCsv = (str) => {
    if (str === null || str === undefined) return '""';
    const s = String(str).replace(/"/g, '""');
    return `"${s}"`;
  };

  const rows = registrations.map(r => [
    escapeCsv(r.id),
    escapeCsv(r.name),
    escapeCsv(r.email),
    escapeCsv(r.whatsapp),
    escapeCsv(r.college),
    escapeCsv(r.branch),
    escapeCsv(r.gradYear),
    escapeCsv(r.referralCode),
    escapeCsv(r.referredBy || 'None'),
    escapeCsv(r.referralCount || 0),
    escapeCsv(r.utmSource || 'direct'),
    escapeCsv(r.createdAt),
    escapeCsv(r.isDemo ? 'Demo Simulated' : 'Live Real')
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
