import * as React from 'react'
import { MobileView } from 'react-device-detect'
import { Slide } from '../type'
import AppToolbar from './AppToolbar'
import OneDollar from '../onedollar.js'
import { useAppDispatch } from '../hooks'
import { nextSlide, previousSlide } from '../slices/slideshowSlice'

interface Props {
  slides: Slide[];
  currentSlide: number
}
type Gesture = {
  name: string;
  score: number;
  recognized: boolean;
  path: {
    start: any[];
    end: any[];
    centroid: any;
  };
  ranking: {
    name: string;
    score: number;
  }[];
};

const Controller: React.FC<Props> = ({ slides, currentSlide }) => {
  const dispatch = useAppDispatch()
  const clickX = new Array()
  const clickY = new Array()
  const clickDrag = new Array()
  let gesturePoints = new Array()
  let gesture: Gesture
  let paint = false
  // Voir ici pour le détails de options https://github.com/nok/onedollar-unistroke-coffee#options
  const options = {
    score: 80, // The similarity threshold to apply the callback(s)
    parts: 64, // The number of resampling points
    step: 2, // The degree of one single rotation step
    angle: 45, // The last degree of rotation
    size: 250 // The width and height of the scaling bounding box
  }
  const recognizer = new OneDollar(options)

  // Let's "teach" two gestures to the recognizer:
  recognizer.add('triangle', [
    [627, 213],
    [626, 217],
    [617, 234],
    [611, 248],
    [603, 264],
    [590, 287],
    [552, 329],
    [524, 358],
    [489, 383],
    [461, 410],
    [426, 444],
    [416, 454],
    [407, 466],
    [405, 469],
    [411, 469],
    [428, 469],
    [453, 470],
    [513, 478],
    [555, 483],
    [606, 493],
    [658, 499],
    [727, 505],
    [762, 507],
    [785, 508],
    [795, 508],
    [796, 505],
    [796, 503],
    [796, 502],
    [796, 495],
    [790, 473],
    [785, 462],
    [776, 447],
    [767, 430],
    [742, 390],
    [724, 362],
    [708, 340],
    [695, 321],
    [673, 289],
    [664, 272],
    [660, 263],
    [659, 261],
    [658, 256],
    [658, 255],
    [658, 255]
  ])
  recognizer.add('circle', [
    [621, 225],
    [616, 225],
    [608, 225],
    [601, 225],
    [594, 227],
    [572, 235],
    [562, 241],
    [548, 251],
    [532, 270],
    [504, 314],
    [495, 340],
    [492, 363],
    [492, 385],
    [494, 422],
    [505, 447],
    [524, 470],
    [550, 492],
    [607, 523],
    [649, 531],
    [689, 531],
    [751, 523],
    [782, 510],
    [807, 495],
    [826, 470],
    [851, 420],
    [859, 393],
    [860, 366],
    [858, 339],
    [852, 311],
    [833, 272],
    [815, 248],
    [793, 229],
    [768, 214],
    [729, 198],
    [704, 191],
    [678, 189],
    [655, 188],
    [623, 188],
    [614, 188],
    [611, 188],
    [611, 188]
  ])
  recognizer.add('suivant', [
    [63.33341979980469, 17.111190795898438],
    [65.11116790771484, 17.111190795898438],
    [65.11116790771484, 18.452801223080066],
    [65.11116790771484, 20.66668701171875],
    [65.86456213024466, 21.168959885790205],
    [68.46000932348493, 22.899292668104405],
    [70.44441986083984, 24.222259521484375],
    [71.1012677313468, 24.550685570850874],
    [73.89130323162777, 25.945712300925177],
    [74.00006103515625, 26.000091552734375],
    [75.7778091430664, 27.777801513671875],
    [75.99411218456976, 28.210415022946247],
    [77.38911257301623, 31.000463693970488],
    [77.5555648803711, 31.3333740234375],
    [79.33331298828125, 31.3333740234375],
    [80.01880906023383, 32.018825970612355],
    [81.11119842529297, 33.11114501953125],
    [82.22453990058487, 34.22453427484819],
    [82.88895416259766, 34.88897705078125],
    [85.06866887471415, 34.88897705078125],
    [86.44445037841797, 34.88897705078125],
    [87.67736139416832, 36.12185631965761],
    [88.22220611572266, 36.66668701171875],
    [89.88314143759612, 38.32751542065004],
    [90.00009155273438, 38.4444580078125],
    [92.95406297187361, 38.4444580078125],
    [93.55558776855469, 38.4444580078125],
    [93.55558776855469, 40.222259521484375],
    [94.29561999329353, 40.222259521484375],
    [95.33334350585938, 40.222259521484375],
    [96.26425981222971, 42.08414007553191],
    [97.11109924316406, 43.777862548828125],
    [98.33682823731236, 43.777862548828125],
    [101.45618677240415, 43.777862548828125],
    [104.22222900390625, 43.777862548828125],
    [104.53824878127824, 43.93586226620773],
    [107.32832379278392, 45.330809971543495],
    [107.7778778076172, 45.555572509765625],
    [109.55561828613281, 47.333343505859375],
    [109.6281811742848, 47.405910130963356],
    [111.33335876464844, 49.111175537109375],
    [112.04116992925863, 49.111175537109375],
    [113.11112976074219, 49.111175537109375],
    [115.16052846435042, 49.111175537109375],
    [116.66676330566406, 49.111175537109375],
    [118.27988699944221, 49.111175537109375],
    [118.44450378417969, 49.111175537109375],
    [120.22225952148438, 49.111175537109375],
    [121.399245534534, 49.111175537109375],
    [122.00001525878906, 49.111175537109375],
    [122.00001525878906, 50.888885498046875],
    [122.00001525878906, 51.6297643479461],
    [122.00001525878906, 52.666717529296875],
    [122.00001525878906, 54.4444580078125],
    [122.00001525878906, 54.749122883037884],
    [122.00001525878906, 56.222259521484375],
    [122.00001525878906, 57.86848141812967],
    [122.00001525878906, 58.00006103515625],
    [122.00001525878906, 59.777801513671875],
    [120.78997681923948, 59.777801513671875],
    [120.22225952148438, 59.777801513671875],
    [120.22225952148438, 61.555633544921875],
    [119.4484503153977, 61.555633544921875],
    [118.44450378417969, 61.555633544921875],
    [116.94866877216795, 63.05144287868507],
    [116.66676330566406, 63.33334350585937],
    [114.88887023925781, 63.33334350585937],
    [113.94607588270111, 63.33334350585937],
    [111.33335876464844, 63.33334350585937],
    [111.10678805800742, 63.78650047684359],
    [109.7118068271148, 66.57655872639812],
    [109.55561828613281, 66.88894653320312],
    [107.7778778076172, 68.66668701171875],
    [107.59685815580633, 68.84770044911609],
    [105.99998474121094, 70.44451904296875],
    [105.3911085595148, 71.0533899985739],
    [104.22222900390625, 72.22225952148438],
    [102.7559086949631, 72.22225952148438],
    [102.44448852539062, 72.22225952148438],
    [100.66673278808594, 72.22225952148438],
    [99.6365501598713, 72.22225952148438],
    [98.88897705078125, 72.22225952148438],
    [97.11109924316406, 72.22225952148438],
    [97.11109924316406, 72.81616713986892],
    [97.11109924316406, 74.00003051757812],
    [97.11109924316406, 75.77783203124999],
    [97.11109924316406, 75.93552567496072],
    [97.11109924316406, 77.55557250976562],
    [95.61178754287718, 77.55557250976562],
    [95.33334350585938, 77.55557250976562],
    [93.55558776855469, 77.55557250976562],
    [93.55558776855469, 78.61873127053492],
    [93.55558776855469, 79.33340454101562],
    [93.55558776855469, 81.73808980562671],
    [93.55558776855469, 82.888916015625],
    [91.58705544346118, 82.888916015625],
    [88.46769690836939, 82.888916015625],
    [88.22220611572266, 82.888916015625],
    [88.22220611572266, 84.66671752929688],
    [87.12613988694947, 84.66671752929688],
    [86.44445037841797, 84.66671752929688],
    [84.72075438074067, 86.39040612955],
    [84.6667022705078, 86.44445800781251],
    [84.6667022705078, 88.2222900390625],
    [83.77214985721639, 89.11683861328737],
    [82.88895416259766, 90.00003051757812],
    [82.88895416259766, 91.77780151367188],
    [82.79639127299522, 91.77780151367188],
    [81.11119842529297, 91.77780151367188],
    [79.67703273790343, 91.77780151367188],
    [79.33331298828125, 91.77780151367188],
    [79.33331298828125, 94.55344029914149],
    [79.33331298828125, 95.33334350585938],
    [79.33331298828125, 97.11117553710936],
    [78.83098119349461, 97.36233981764853],
    [76.04093850911859, 98.75735217953277],
    [75.7778091430664, 98.888916015625],
    [74.00006103515625, 100.66668701171874],
    [74.00006103515625, 100.97772668175377],
    [74.00006103515625, 102.44448852539062],
    [73.26101508839942, 103.92262482262105],
    [72.2223129272461, 106.00009155273438],
    [72.2223129272461, 106.79678562770448],
    [72.2223129272461, 107.77780151367186],
    [70.71022443036857, 109.28978619040474],
    [70.44441986083984, 109.55557250976562],
    [68.66667938232422, 111.3333740234375],
    [68.50452659811113, 111.49552750354049],
    [66.888916015625, 113.11114501953125],
    [66.29882442033963, 113.70126447166386],
    [65.11116790771484, 114.88897705078125],
    [65.11116790771484, 116.32869599281334],
    [65.11116790771484, 116.66668701171875],
    [65.11116790771484, 118.4444580078125],
    [64.40152866208446, 119.15411857188744],
    [63.33341979980469, 120.22225952148438],
    [62.19578851917599, 121.35981757379061],
    [61.55553436279297, 122.00003051757811],
    [61.55553436279297, 123.77786254882814],
    [61.11943482903704, 123.77786254882814],
    [59.777786254882805, 123.77786254882814],
    [59.777786254882805, 125.55557250976562]
  ])
  recognizer.add('precedent', [
    [161.1112060546875, 13.555587768554688],
    [159.33331298828125, 13.555587768554688],
    [159.33331298828125, 15.333358764648438],
    [159.28755728085247, 15.379116828472995],
    [157.55557250976562, 17.111190795898438],
    [156.38465786426156, 17.111190795898438],
    [155.77781677246094, 17.111190795898438],
    [154.1062210262215, 19.618609523664027],
    [152.22232055664062, 22.444488525390625],
    [152.0878589323746, 22.623768126453633],
    [149.91561460269563, 25.520052467521037],
    [147.74337027301667, 28.416336808588436],
    [146.88893127441406, 29.555572509765625],
    [145.06147759839175, 30.773867989337756],
    [142.0491389836678, 32.78208224144773],
    [141.5555419921875, 33.11114501953125],
    [139.41504075902446, 35.25167381125839],
    [138.0000457763672, 36.66668701171875],
    [136.551741583269, 37.3908453237922],
    [134.4445343017578, 38.4444580078125],
    [133.87904953898357, 39.575403265920016],
    [132.2599412405834, 42.81355037965442],
    [130.88890075683594, 45.555572509765625],
    [130.39277492157058, 45.80363862116325],
    [127.33340454101562, 47.333343505859375],
    [127.24401377876947, 47.51212656486483],
    [125.62494439095065, 50.75029313401513],
    [125.55564880371094, 50.888885498046875],
    [123.77775573730469, 52.666717529296875],
    [123.10519825615718, 53.33928366949964],
    [120.54522367995688, 55.899291204907065],
    [120.22225952148438, 56.222259521484375],
    [118.44450378417969, 58.00006103515625],
    [117.98525364981785, 58.459303286139956],
    [115.42524062176912, 61.01927236961645],
    [114.88887023925781, 61.555633544921875],
    [113.11112976074219, 61.555633544921875],
    [112.62630314179815, 62.52527846017771],
    [111.33335876464844, 65.11114501953125],
    [110.6040763605886, 65.11114501953125],
    [109.55561828613281, 65.11114501953125],
    [108.40543828178491, 67.41154451735224],
    [107.7778778076172, 68.66668701171875],
    [106.21013370248777, 70.23437729611608],
    [105.99998474121094, 70.44451904296875],
    [103.02763636297682, 71.93068685401167],
    [102.44448852539062, 72.22225952148438],
    [102.44448852539062, 74.00003051757812],
    [102.44448852539062, 75.19065504895019],
    [102.44448852539062, 75.77783203124999],
    [99.41129143694377, 75.77783203124999],
    [98.88897705078125, 75.77783203124999],
    [98.88897705078125, 77.55557250976562],
    [98.88897705078125, 78.87589171583411],
    [98.88897705078125, 79.33340454101562],
    [97.11109924316406, 79.33340454101562],
    [97.11109924316406, 80.71838797896358],
    [97.11109924316406, 81.11114501953125],
    [99.9979825436022, 82.55454950308837],
    [100.66673278808594, 82.888916015625],
    [102.44448852539062, 82.888916015625],
    [103.53942520585255, 82.888916015625],
    [104.22222900390625, 82.888916015625],
    [104.22222900390625, 84.66671752929688],
    [105.38199776292733, 84.66671752929688],
    [105.99998474121094, 84.66671752929688],
    [107.7778778076172, 84.66671752929688],
    [107.7778778076172, 85.89121155535365],
    [107.7778778076172, 88.2222900390625],
    [109.067173394655, 88.2222900390625],
    [111.33335876464844, 88.2222900390625],
    [111.33335876464844, 89.57647873981571],
    [111.33335876464844, 90.00003051757812],
    [113.11112976074219, 90.00003051757812],
    [114.53018105763267, 90.00003051757812],
    [114.88887023925781, 90.00003051757812],
    [116.66676330566406, 90.00003051757812],
    [116.66676330566406, 91.48382234029339],
    [116.66676330566406, 91.77780151367188],
    [119.99315820303222, 91.77780151367188],
    [120.22225952148438, 91.77780151367188],
    [120.22225952148438, 93.55560302734375],
    [121.835730760107, 93.55560302734375],
    [122.00001525878906, 93.55560302734375],
    [123.77775573730469, 93.55560302734375],
    [123.77775573730469, 95.23395212089271],
    [123.77775573730469, 95.33334350585938],
    [127.1180465143851, 96.44679606349891],
    [129.11114501953125, 97.11117553710936],
    [129.11114501953125, 98.63063510788922],
    [129.11114501953125, 98.888916015625],
    [132.47323818254213, 98.888916015625],
    [132.66665649414062, 98.888916015625],
    [134.4445343017578, 98.888916015625],
    [134.4445343017578, 100.53799396715597],
    [134.4445343017578, 100.66668701171874],
    [134.4445343017578, 102.44448852539062],
    [136.1584138142698, 102.44448852539062],
    [136.2222900390625, 102.44448852539062],
    [136.2222900390625, 104.22225952148438],
    [138.0000457763672, 104.22225952148438],
    [138.00101688892272, 104.22225952148438],
    [141.5555419921875, 104.22225952148438],
    [141.62139095966938, 104.22225952148438],
    [143.3334197998047, 104.22225952148438],
    [144.68279469810122, 105.57169232938712],
    [145.11117553710938, 106.00009155273438],
    [145.11117553710938, 107.77780151367186],
    [146.34800465470212, 107.77780151367186],
    [146.88893127441406, 107.77780151367186],
    [148.6666717529297, 107.77780151367186],
    [148.6666717529297, 109.07950848619095],
    [148.6666717529297, 109.55557250976562],
    [150.44442749023438, 109.55557250976562],
    [150.44442749023438, 110.92212681963291],
    [150.44442749023438, 111.3333740234375],
    [152.22232055664062, 113.11114501953125],
    [152.91721325188595, 113.11114501953125],
    [154.00006103515625, 113.11114501953125],
    [155.77781677246094, 113.11114501953125],
    [155.77781677246094, 113.87091556970292],
    [155.77781677246094, 114.88897705078125],
    [157.55557250976562, 116.66668701171875],
    [157.64379119372236, 116.66668701171875],
    [159.33331298828125, 116.66668701171875],
    [160.69867859850692, 118.03195887580756],
    [161.1112060546875, 118.4444580078125],
    [161.1112060546875, 120.22225952148438],
    [162.3703967162533, 120.22225952148438],
    [164.6667022705078, 120.22225952148438],
    [165.99077078699997, 120.22225952148438],
    [166.4444580078125, 120.22225952148438],
    [168.2222137451172, 120.22225952148438],
    [168.2222137451172, 121.61119063411381],
    [168.2222137451172, 122.00003051757811],
    [170.0001068115234, 122.00003051757811],
    [170.0001068115234, 123.45367163845424],
    [170.0001068115234, 123.77786254882814],
    [171.77783203125, 123.77786254882814],
    [171.77783203125, 125.2963204894743],
    [171.77783203125, 127.33334350585938],
    [173.36118308561157, 127.33334350585938],
    [173.5555877685547, 127.33334350585938],
    [175.33335876464844, 127.33334350585938],
    [175.33335876464844, 128.98154189756917],
    [175.33335876464844, 129.11117553710938],
    [177.111083984375, 129.11117553710938],
    [178.8240991958549, 129.11117553710938],
    [178.8889923095703, 129.11117553710938],
    [180.66673278808594, 129.11117553710938],
    [180.66673278808594, 130.888916015625],
    [180.66673278808594, 130.888916015625]
  ])

  // Cette ligne permet d'avoir accès à notre canvas après que le composant aie été rendu. Le canvas est alors disponible via refCanvas.current
  const refCanvas = React.useRef(null)

  function addClick (x: number, y: number, dragging: boolean) {
    const width = refCanvas.current.getBoundingClientRect().width
    const height = refCanvas.current.getBoundingClientRect().height
    clickX.push(x)
    clickY.push(y)
    clickDrag.push(dragging)
    gesturePoints.push([x * width, y * height])
  }

  function redraw () {
    const context = refCanvas.current.getContext('2d')
    const width = refCanvas.current.getBoundingClientRect().width
    const height = refCanvas.current.getBoundingClientRect().height

    // Ceci permet d'adapter la taille du contexte de votre canvas à sa taille sur la page
    refCanvas.current.setAttribute('width', width)
    refCanvas.current.setAttribute('height', height)
    context.clearRect(0, 0, context.width, context.height) // Clears the canvas
    context.strokeStyle = '#df4b26'
    context.lineJoin = 'round'
    context.lineWidth = 2

    for (let i = 0; i < clickX.length; i++) {
      context.beginPath()
      if (clickDrag[i] && i) {
        context.moveTo(clickX[i - 1] * width, clickY[i - 1] * height)
      } else {
        context.moveTo(clickX[i] * width - 1, clickY[i] * height)
      }
      context.lineTo(clickX[i] * width, clickY[i] * height)
      context.stroke()
    }
    if (gesture) {
      context.strokeStyle = '#666'
      context.lineJoin = 'round'
      context.lineWidth = 5

      context.beginPath()
      context.moveTo(gesturePoints[0][0] * width, gesturePoints[0][1] * height)
      for (let i = 1; i < gesturePoints.length; i++) {
        context.lineTo(
          gesturePoints[i][0] * width - 1,
          gesturePoints[i][1] * height
        )
      }

      context.stroke()
    }
  }

  function pointerDownHandler (ev: {
    pointerType: any;
    pageX: number;
    pageY: number;
  }) {
    console.error(
      'HEY ! ICI ON PEUT DIFFERENCIER QUEL TYPE DE POINTEUR EST UTILISE !'
    )

    const width = refCanvas.current.getBoundingClientRect().width
    const height = refCanvas.current.getBoundingClientRect().height
    const mouseX = (ev.pageX - refCanvas.current.offsetLeft) / width
    const mouseY = (ev.pageY - refCanvas.current.offsetTop) / height

    paint = true
    addClick(mouseX, mouseY, false)
    redraw()
  }

  function pointerMoveHandler (ev: { pageX: number; pageY: number }) {
    if (paint) {
      const width = refCanvas.current.getBoundingClientRect().width
      const height = refCanvas.current.getBoundingClientRect().height
      addClick(
        (ev.pageX - refCanvas.current.offsetLeft) / width,
        (ev.pageY - refCanvas.current.offsetTop) / height,
        true
      )
      redraw()
    }
  }

  function pointerUpEventHandler (ev: any) {
    paint = false
    const gesture = recognizer.check(gesturePoints) as Gesture
    console.log('[[' + gesturePoints.join('],[') + ']]')
    gesturePoints = []
    console.log("gesture: ", gesture)
    if (gesture.recognized === true && gesture.name === 'precedent') {
      dispatch(previousSlide())
    }
    if (gesture.recognized === true && gesture.name === 'suivant') {
      dispatch(nextSlide())
    }
    const canvas = document.querySelector('canvas')
    const context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)
  }

  React.useEffect(() => {
    const canvas = document.querySelector('canvas')
    canvas.onpointerdown = pointerDownHandler
    canvas.onpointermove = pointerMoveHandler
    canvas.onpointerup = pointerUpEventHandler
  }, [onpointerdown, onpointermove, onpointerup])

  return (
    <MobileView style={{ height: '100%' }}>
      <ul className="border-2 border-black m-2 p-6 list-disc">
        {slides[Number(currentSlide)].items?.map((key) => (
          <li key={key}> {key} </li>
        ))}
      </ul>
      <AppToolbar slides={slides} currentSlide={currentSlide}/>
      <canvas
        style={{
          touchAction: 'none',
          backgroundColor: 'white',
          margin: 'auto'
        }}
        className="stroke"
        ref={refCanvas}
      ></canvas>
    </MobileView>
  )
}

export default Controller
