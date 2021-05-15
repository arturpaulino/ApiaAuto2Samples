// api endpoint
export const API_ENDPOINT = "https://www.strava.com";

// Strava KEY
export const STRAVAKEY = {
  IDCLIENT: "11111",
  SECRETCUSTOMER: "111111111111111111111111",
  REDIRECT_URI: "https://apiautoart.page.link/authorize/exchange_token&approval_prompt=force&scope=read_all&scope=activity:read_all",

  TOKENMAPMOX: "111111111111111111111111"
};

// resources
export const RESOURCES = {
  DEAUTHORIZE: "/oauth/deauthorize",
  AUTHORIZE: "/oauth/authorize",
  OAUTH: "/oauth/token",
  ATHLETE: "/api/v3/athletes",
  ATHLETE_CLUB: "/api/v3/athlete/clubs",
  ACTIVITIES: "/api/v3/activities",
  CLUBS: "/api/v3/clubs",
  SEGMENTS: "/api/v3/segments",
  UPLOADS: "/api/v3/uploads",
  STATS: "stats",
  MEMBERS: "members",
  ANNOUNCEMENTS: "announcements",
  CLUB_ACTIVITIES: "activities"
};

// application type
export const APPLICATION_TYPE = {
  JSON: "application/json",
  OCTET_STREAM: "application/octet-stream",
  FORM_DATA: "multipart/form-data"
};
