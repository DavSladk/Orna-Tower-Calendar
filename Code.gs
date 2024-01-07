const CALENDAR_NAME = "Orna Towers";
const TIME_BLOCKS_START_MINS = [60,300,600,900,936,1200];
const TIME_BLOCK_PERIOD = TIME_BLOCKS_START_MINS.length;
const DAY_PERIOD = 6;
const SHEDULE_PERIOD = 42;
const AT_MAX_LVL_BLOCK_AMOUNT = 3;

const SELENE_ORIGIN_START_DATE = new Date("Jan 01 UTC 2024");
const SELENE_ORIGIN_END_DATE = new Date("Jan 01 UTC 2024");
const SELENE_ORIGIN_START_INDEX = 2;
const SELENE_ORIGIN_END_INDEX = 5;

const EOS_ORIGIN_START_DATE = new Date("Jan 02 UTC 2024");
const EOS_ORIGIN_END_DATE = new Date("Jan 02 UTC 2024");
const EOS_ORIGIN_START_INDEX = 1;
const EOS_ORIGIN_END_INDEX = 4;

const OCEANUS_ORIGIN_START_DATE = new Date("Jan 03 UTC 2024");
const OCEANUS_ORIGIN_END_DATE = new Date("Jan 03 UTC 2024");
const OCEANUS_ORIGIN_START_INDEX = 0;
const OCEANUS_ORIGIN_END_INDEX = 3;

const THEMIS_ORIGIN_START_DATE = new Date("Jan 03 UTC 2024");
const THEMIS_ORIGIN_END_DATE = new Date("Jan 04 UTC 2024");
const THEMIS_ORIGIN_START_INDEX = 5;
const THEMIS_ORIGIN_END_INDEX = 2;

const PROMETHEUS_ORIGIN_START_DATE = new Date("Wed Jan 04 UTC 2024");
const PROMETHEUS_ORIGIN_END_DATE = new Date("Mon Jan 05 UTC 2024");
const PROMETHEUS_ORIGIN_START_INDEX = 4;
const PROMETHEUS_ORIGIN_END_INDEX = 1;

function createCalendar() {
  var calendar = CalendarApp.createCalendar(CALENDAR_NAME);
  calendar.setColor(CalendarApp.Color.PLUM);
  return calendar
}

function getNewIndex(oldIndex)
{
  let newIndex = oldIndex - 1;
  if (newIndex < 0)
  {
    newIndex = TIME_BLOCK_PERIOD - 1;
  }
  return newIndex;
}

function setUpTowerEvents(calendar, eventName, color, originStartDate, originEndDate, originStartIndex, originEndIndex)
{
  let startDate = originStartDate;
  let endDate = originEndDate;
  let startIndex = originStartIndex;
  let endIndex = originEndIndex;

  for (let i = 0; i < SHEDULE_PERIOD; i++)
  {
    startDate.setUTCHours(0,TIME_BLOCKS_START_MINS[startIndex],0);
    endDate.setUTCHours(0,TIME_BLOCKS_START_MINS[endIndex],0);

    let event = calendar.createEventSeries(
      eventName,
      startDate,
      endDate,
      CalendarApp.newRecurrence().addWeeklyRule().interval(SHEDULE_PERIOD));
    event.setColor(color);

    Logger.log(i + " START: " + Utilities.formatDate(startDate, "UTC", "dd.MM.yyyy HH:mm:ss z"));
    Logger.log(i + " END: " + Utilities.formatDate(endDate, "UTC", "dd.MM.yyyy HH:mm:ss z"));

    let newStartIndex = getNewIndex(startIndex)
    let newEndIndex = getNewIndex(endIndex)

    if(startIndex < newStartIndex)
    {
      startDate.setDate(startDate.getDate() - 1);
    }

    if(endIndex < newEndIndex)
    {
      endDate.setDate(endDate.getDate() - 1);
    }

    startIndex = newStartIndex;
    endIndex = newEndIndex;

    startDate.setDate(startDate.getDate() + DAY_PERIOD);
    endDate.setDate(endDate.getDate() + DAY_PERIOD);
  }
}

function main()
{
  let cal = createCalendar();

  Logger.log("---SELENE---")
  setUpTowerEvents(cal,
    "Selene",
    CalendarApp.EventColor.MAUVE,
    SELENE_ORIGIN_START_DATE, SELENE_ORIGIN_END_DATE, SELENE_ORIGIN_START_INDEX, SELENE_ORIGIN_END_INDEX
  );
  Logger.log("---EOS---")
  setUpTowerEvents(cal,
    "Eos",
    CalendarApp.EventColor.YELLOW,
    EOS_ORIGIN_START_DATE, EOS_ORIGIN_END_DATE, EOS_ORIGIN_START_INDEX, EOS_ORIGIN_END_INDEX
  );
  Logger.log("---OCEANUS---")
  setUpTowerEvents(cal,
    "Oceanus",
    CalendarApp.EventColor.BLUE,
    OCEANUS_ORIGIN_START_DATE, OCEANUS_ORIGIN_END_DATE, OCEANUS_ORIGIN_START_INDEX, OCEANUS_ORIGIN_END_INDEX
  );
  Logger.log("---THEMIS---")
  setUpTowerEvents(cal,
    "Themis",
    CalendarApp.EventColor.GRAY,
    THEMIS_ORIGIN_START_DATE, THEMIS_ORIGIN_END_DATE, THEMIS_ORIGIN_START_INDEX, THEMIS_ORIGIN_END_INDEX
  );
  Logger.log("---PROMETHEUS---")
  setUpTowerEvents(cal,
    "Prometheus",
    CalendarApp.EventColor.RED,
    PROMETHEUS_ORIGIN_START_DATE, PROMETHEUS_ORIGIN_END_DATE, PROMETHEUS_ORIGIN_START_INDEX, PROMETHEUS_ORIGIN_END_INDEX
    );
}