import React, {useState,useEffect} from 'react';
import {Chart} from 'primereact/chart';
import {ValorProductoDataServise} from '../services/DataService';
import {ProductosClienteDataService} from '../services/DataService';

 
export default function Grafico2 (props){

	const [valorProducto,setValorProducto] = useState(null);
	const [producto,setProducto] = useState(null);
	const valordataService = new ValorProductoDataServise();
	const productoDataService = new ProductosClienteDataService();
	const [seriesVisible,setSeriesVisible] = useState([true,false,false]);

	const handleValorResult = dataRes => {

		setValorProducto(dataRes.data[0]?dataRes.data[0]:{valor:[]});
	};

	const handleProductoResult = dataRes =>{
		setProducto(dataRes.data);
	};
	
	useEffect(()=>{
		valordataService.getValorProducto(props.cuentaId).then(handleValorResult);
		productoDataService.get(props.cuentaId).then(handleProductoResult);
    }
	,[props.cuentaId]);

	const onLegendItemClick = (event,legendItem) => {
		let nuevoEstado = seriesVisible;
		nuevoEstado[legendItem.datasetIndex] =!nuevoEstado[legendItem.datasetIndex];
		setSeriesVisible(nuevoEstado);
    }

	const optionsMes = {
		responsive: true,
		tooltips: {
			mode: 'index',
			intersect: true
		},
		legend  :{
			onClick : onLegendItemClick
		}
	};



	const dataMes = {		
		labels: ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'],
		datasets: [
			{	type:"line",
				fill: "false",
				label: 'Diciembre',
				backgroundColor: '#000066',
				borderColor: '#000066',
				data: valorProducto?valorProducto.valorDiario1:[],
				hidden:seriesVisible[0]

			},
			{	type:"line",
				fill: "false",
				label: 'Noviembre',
				backgroundColor: 'rgb(134, 45, 89, 0.70)',
				borderColor: 'rgb(134, 45, 89, 0.70)',
				data: valorProducto?valorProducto.valorDiario2:[],
				hidden:seriesVisible[1]
			},
			{	type:"line",
				fill: "false",
				label: 'Septiembre',
				backgroundColor: '#ffc266',
				borderColor: '#ffc266',
				data: valorProducto?valorProducto.valorDiario3:[],
				hidden:seriesVisible[2]
			}
		] 
	};

		return (
		
		producto && 
		<div>
			<div className="content-section implementation">
					<h1>Comparacion ultimos tres meses 2019</h1>			
                    <Chart  type="bar" data={dataMes} options={optionsMes} />
            </div>
		</div>

		);
	
}
