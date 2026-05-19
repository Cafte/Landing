import type { APIRoute } from 'astro';
import { Resend } from 'resend';

// Daniel, ya he puesto tu API Key real.
const resend = new Resend('re_JxMNv7j1_N1dqNF8Bq7Qh2dEfAiccodAs');

export const POST: APIRoute = async ({ request }) => {
  console.log('--- Intentando envío con Resend ---');
  try {
    const data = await request.json();
    const { name, phone, email, vehicleType, problem, preferredDate, message, rating } = data;

    // Determinamos si es una opinión o un contacto normal
    const isOpinion = rating !== undefined;
    const subject = isOpinion 
      ? `Nueva Opinión: ${rating} estrellas de ${name || 'Anónimo'}`
      : `Nueva Solicitud: ${name}`;

    const html = isOpinion
      ? `
        <h2>Nueva opinión recibida</h2>
        <p><strong>Cliente:</strong> ${name || 'Anónimo'}</p>
        <p><strong>Calificación:</strong> ${rating} / 5 estrellas</p>
        <p><strong>Mensaje:</strong> ${message}</p>
        <hr />
        <p>Enviado desde la sección de opiniones de tu web.</p>
      `
      : `
        <h2>Nueva solicitud de servicio para el taller</h2>
        <p><strong>Cliente:</strong> ${name}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Email del cliente:</strong> ${email}</p>
        <p><strong>Vehículo:</strong> ${vehicleType}</p>
        <p><strong>Problema reportado:</strong> ${problem}</p>
        <p><strong>Fecha sugerida:</strong> ${preferredDate || 'No especificada'}</p>
        <hr />
        <p>Este mensaje fue enviado automáticamente desde tu sitio web.</p>
      `;

    const { error } = await resend.emails.send({
      from: 'AutoTech <onboarding@resend.dev>',
      to: ['danirexus517@gmail.com'],
      subject: subject,
      html: html,
    });

    if (error) {
      console.error('Error de Resend:', error);
      return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }

    console.log('¡Correo enviado con éxito!');
    return new Response(JSON.stringify({ message: 'Éxito' }), { status: 200 });
  } catch (e) {
    console.error('Error en el servidor:', e);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), { status: 500 });
  }
};
