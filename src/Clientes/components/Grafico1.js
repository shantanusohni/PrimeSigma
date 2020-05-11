import React, {useState,useEffect} from 'react';
import {Chart} from 'primereact/chart';
import {ValorProductoDataServise} from '../services/DataService';
import {ProductosClienteDataService} from '../services/DataService';
import {Slider} from 'primereact/slider';
 
export default function Grafico (props){

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

	const onLegendItemClick = (event,legendItem) => {
		let nuevoEstado = seriesVisible;
		nuevoEstado[legendItem.datasetIndex] =!nuevoEstado[legendItem.datasetIndex];
		setSeriesVisible(nuevoEstado);
    }
	
	useEffect(()=>{
		valordataService.getValorProducto(props.cuentaId).then(handleValorResult);
		productoDataService.get(props.cuentaId).then(handleProductoResult);
    }
	,[props.cuentaId]);
	

	const optionsAnual = {
		responsive: true,
		tooltips: {
			mode: 'index',
			intersect: true
		},
		legend  :{
			onClick : onLegendItemClick
		}
		
	};


	const dataAnual = {		
		labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto','Septiembre','Noviembre','Diciembre'],
		datasets: [
			{
				type: 'line',
				label: '2018',
				data: valorProducto?valorProducto.valorAnualPasado:[],
				fill: false,
				borderDash: [2, 2],
				hidden:seriesVisible[0],
				backgroundColor: 'rgb(128, 17, 0)',
				borderColor: 'rgb(128, 17, 0)',
			},{
				type: 'bar',
				label: '2019',
				//backgroundColor: 'rgb(223, 147, 32, 0.90)',
				backgroundColor: 'rgb(255, 125, 102, 0.90)',
				data: valorProducto?valorProducto.valorAnual:[],
				borderWidth: 2,
				hidden:seriesVisible[1]
			},{
			type: 'line',
			label: 'Promedio tipo banca',
                    data:  valorProducto?valorProducto.valorAnualpromedioBancas:[],
                    fill: true,
					borderColor: 'rgb(36, 143, 36, 0.70)',
					backgroundColor: 'rgb(36, 143, 36, 0.70)',
					hidden:seriesVisible[2]
					
		} ]
	};


		return (
		producto && 
		<div>
			<div className="content-section implementation">
					<h1>Comparacion saldos año anterior y tipo banca</h1>
                    <Chart  type="bar" data={dataAnual} options={optionsAnual} />
            </div>
		</div>
		
		);
	
}
