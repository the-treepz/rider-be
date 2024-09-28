import admin from 'firebase-admin';
// https://console.firebase.google.com/project/treepz-bd315/settings/serviceaccounts/adminsdk
admin.initializeApp({
  // credential: admin.credential.cert(serviceAccount),
  credential: admin.credential.cert({
    projectId: 'treepz-bd315',
    clientEmail: 'firebase-adminsdk-uw192@treepz-bd315.iam.gserviceaccount.com',
    privateKey:
      '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC17NTrIRZw0qKW\nGZ86m9P6dJlC67+jDkYcXK1palSrGE0AW8DcsIn0vabJgulk75EuQPkZGPCGssNw\niqLFjQwzmORClLPDGwU9mMtdZ6bfInCoGVR13X4veeDdAHngiWvID46rxhOSgb2v\nGANNR+YdK8SCyve5ZuwCL6wPhpptRRNjA0Ce4BdLIjZ8x4jlRqH/0HR5O7uGqWbl\nJ6ed4GmekzT5O/VEAlt8OUjh+kajiMTzuqKW1b8qOohuFeOgtVS+p/qLM2RTA4pz\nJD6iImGp0Kfzry1r9cL6JxlNPLQBirPucOWSwx0+J9gdKjg6OePHTJfMbNb/DNuY\nNsBvOKQdAgMBAAECggEAEKQS/tYGOjg+OIor8z29SGfhfApZ+3WLCr2cfCvGhmcA\n5iM+c0FvwRQW/VBM/pdeWZOGZZoPKFcSQwlfZcAm6VJXMNLu1Y4zbsS693aLgFYj\nZXD5tZVW3Uth+v036MbRNdncdFB4Slq1Sd6hsLA+t5ThExCzU8F7HaEUNVBb8Fot\nM/Wz80Gi/vamStot64T8SDE+p+Z0qtTVrD40OJ9notTLKKkr/kCQX33R0+3E1upE\ngoF5ANaYQQFjKUNC7m2kb3Y1yNT7SzyqOY71TxPqnIIlOrR9GHsSIae7Y0KABVlP\n+44bEipuCa0mnHFvRB6YVjfVdRXG0H/hI9m8VxcqgQKBgQDyBK/LTo2p1Iq+mm13\n5XZK1ApS5vevmbUMoChor+GqWpp9NPwVrx2XQo2lrsXGjjYfRmx66JYYR8UlMw03\nb/XzBDqlPIPC0RuvDkQ/L9geE5MwHBZKWWMkhI8SSciGZPwNFg/sASQlbGHGsFkq\n3bbZdaNcsRIogKjG/DMOoUVRnQKBgQDAb2almmNvMvwnSnnkAIh9IJWYA/XlM789\nQm3s70VWJm8dfVNJVKoQgMOywUm2eD3+B9at7cm9+7OGilloL9OIf8GWpIq1N3lt\nDwK+RJOUKXOILs+WtVe8atEhq/11q54V9MM1ypEXWhD1avp3VvzVhf+MskVdrNr2\nayUc7J9UgQKBgDBSKTtBct1ut0j5ElQ291hXX7xPqzJfURu1Onw0aa0Wq/PFyXMW\n5KSXwCpNa+WJ7VpvOCeOGrG8WqtjtwbTjtq3hHILVA9oqstX4N5w0ginReL8KKMt\nl7Lp2JsBKk1TClQejI1FaQ8jxZ3jBdqeK+zdJQHTxNlbXtdj8VnBb1KtAoGBALdX\nbAzLk4EWqnck1g0NFP1iViSHYXgGXWYYLHNZZE44QBVwmjF7oKwogkuFLJ3U4ftt\nrHP54gRIEztUBOrm5jtevSqxihYtzFrDunFdFN5Mv+4360BDdlvlyWqzWsEJyYxR\nrstJPANrpEyuqAObtTgaeuep0bz2O4gbfTiZmRQBAoGAPa7+d10ZXmslg7XA9kWp\n39SS9B6CP4VAL6xREmeJkzK1CXfyflYlLVqV8/Af2/I0BIG55ppE75QDGjVGduSI\n/EmKxKI+IAn+hy1rVZklv/8lvLpWvwBgJrL9x+3JNR+jUjhafIXtf7vN1JvhRn0Y\nMVG3wTSJ0wsdiRIwCa39ZsY=\n-----END PRIVATE KEY-----\n',
  }),
});
export const sendPushNotification = async (
  deviceToken: string,
  message: any,
) => {
  try {
    const payload = {
      notification: {
        title: message.title,
        body: message.body,
      },
      data: message.data, // Additional data payload for your app
    };
    const response = await admin.messaging().sendToDevice(deviceToken, payload);
    console.log('Push notification sent successfully:', response);
  } catch (error) {
    console.error('Error sending push notification:', error);
    throw error; // Rethrow the error if you want to handle it further up the chain
  }
};
