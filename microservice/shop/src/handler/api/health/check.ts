/**
 * Health check
 */
export const handler = async (): Promise<object> => {
  return {
      statusCode: 200,
      body: JSON.stringify({
          status: 'success',
          data: {}
      })
  }
}
