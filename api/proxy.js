import { NowRequest, NowResponse } from '@vercel/node';
import fetch from 'node-fetch';

export default async (req = NowRequest, res = NowResponse) => {
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxQGcm9ehgh89sdv0bXZNmQuN-afX37EpiCkTKNYd4Cu1YY5rBhLVebkJJ9VCyay27wDw/exec';

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL);
    const body = await response.text();

    // Configurar cabeceras de respuesta
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');

    res.status(200).send(body);
  } catch (error) {
    res.status(500).send('Error fetching the Google Apps Script');
  }
};
