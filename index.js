const readline = require("readline");

let values = new Set([3, 5]);

const div_sum = (num, elements = [...values]) => {
  let sum = 0;
  console.log(elements);
  for (let i = 1; i < num; i++) {
    if (elements.some((e) => i % e === 0)) {
      // console.log("=> ", i);
      sum += i;
    }
  }
  return sum;
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const sum_elements = (elements, num) => {
  const start_time = new Date().getTime();
  const resultado = div_sum(num, elements);
  const end_time = new Date().getTime();
  console.log(
    `O somatório dos números divisíveis por ${elements} menores que ${num} é: ${resultado}`
  );
  console.log(`Tempo de execução: ${end_time - start_time} ms`);
};

const get_elements = async () => {
  return new Promise((resolve) => {
    rl.question(
      "Digite os números separados por vírgula (ou pressione Enter para [3,5]): ",
      (ev) => {
        const input = ev.trim() === "" ? [3, 5] : ev.split(",").map(Number);
        resolve(input.filter((num) => !isNaN(num))); // Filtrar apenas números válidos
      }
    );
  });
};

const main = async () => {
  while (1) {
    const num = parseInt(
      await new Promise((resolve) => {
        rl.question(
          'Digite um número inteiro positivo ou "q" para sair: ',
          resolve
        );
      })
    );
    if (isNaN(num) || num <= 0) {
      console.log("Por favor, insira um número inteiro positivo.");
      continue;
    }
    const input = await get_elements();

    if (input.length === 0) {
      console.log("Por favor, insira números válidos.");
      continue;
    }
    sum_elements(input, num);
  }
  console.log("Saindo do programa.");
  rl.close();
};

main();
