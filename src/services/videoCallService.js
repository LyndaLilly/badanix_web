import ApiUrl from "../constants/ApiUrl";

/**
 * Create video call
 */
export async function createVideoCall(appointmentId, token) {
  const response = await fetch(ApiUrl.CREATE_VIDEO_CALL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      appointment_id: appointmentId,
    }),
  });

  return await response.json();
}

/**
 * Get existing video call by appointment
 */
export async function getVideoCall(appointmentId, token) {
  const response = await fetch(
    `${ApiUrl.GET_VIDEO_CALL}/${appointmentId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  return await response.json();
}

/**
 * Generate Agora Token
 */
export async function getAgoraToken(appointmentId, token) {
  const response = await fetch(ApiUrl.AGORA_TOKEN, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      appointment_id: appointmentId,
    }),
  });

  return await response.json();
}
/**
 * Start Call
 */
export async function startCall(videoCallId, token) {
  const response = await fetch(
    `${ApiUrl.START_VIDEO_CALL}/${videoCallId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  return await response.json();
}


/**
 * Leave Call
 */
export async function leaveCall(videoCallId, token) {
  const response = await fetch(
    `${ApiUrl.LEAVE_VIDEO_CALL}/${videoCallId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  return await response.json();
}

export const endCall = async (id, token) => {
  const response = await fetch(`${ApiUrl.END_VIDEO_CALL}/${id}/end`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  return response.json();
};