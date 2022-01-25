const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("report")
    .setDescription("Reporte um erro.")
    .addStringOption(opt => opt.setName("report").setDescription("Reportar erro").setRequired(true))
    ,
  run: async (interaction) => {
    const string = interaction.options.getString('report');
    interaction.reply({ content: `:white_check_mark: | Erro reportado para equipe!\nEntre no meu servidor de suporte para saber mais sobre\nhttps://discord.gg/xUu6avddnN`, ephemeral:true });
    interaction.client.channels.cache.get("934457189156917298").send({content:`:warning: | Erro reportado\n${string}\nReportado por ${interaction.member.user.tag} (\`${interaction.member.id}\`)`})
  },
};
