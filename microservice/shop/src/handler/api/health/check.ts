/**
 * Health check
 */
export const handler = async (event): Promise<object> => {
  console.log('Health check event:', JSON.stringify(event, null, 2));
  return {
      statusCode: 200,
      body: JSON.stringify({
          status: 'success',
          data: {}
      })
  }
}
